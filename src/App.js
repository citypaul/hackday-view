/* eslint-disable */
import React, { Component } from 'react';
import ScenarioGenerator from './components/scenario-generator';
import ScenarioList from './components/scenario-list';
import jquery from 'jquery';

const App = React.createClass({
    getInitialTeamModel() {
        return {
            goals: 0,
            possession: 50,
            shotsOnTarget: 0,
            shotsBlocked: 0,
            shotsOffTarget: 0,
            fouls: 0,
            yellowCards: 0,
            redCards: 0,
            penalties: 0,
            corners: 0,
            crosses: 0,
            turnOvers: 0,
            //passCompletions: 0,
            nonAttackingFreekicks: 0,
            attackingFreekicks: 0,
            attackingPasses: 0,
            bigChances: 0,
            divingSaves: 0
        }
    },

    getInitialScenarioGeneratorModel() {
        return {
            home: this.getInitialTeamModel(),
            away: this.getInitialTeamModel(),
            weights: {
                goals: 10,
                possession: 1,
                shotsOnTarget: 4,
                shotsBlocked: 1,
                shotsOffTarget: 2,
                fouls: -1, // should we get rid of those? we already have freeKicks
                redCards: -10, // yellow card?
                yellowCards: -5,
                penalties: 3,
                corners: 2,
                crosses: 1,
                turnOvers: -5,
                attackingFreekicks: 2,
                //passCompletions: 1, percentage, like possession, but cumulative
                nonAttackingFreekicks: 1,
                attackingPasses: 1,
                bigChances: 10,
                divingSaves: -4
            },
            points: {
                home: 0,
                away: 0
            },
            totals: {
                home: 50,
                away: 50
            },
            scenarioName: "unset",
            scenarioFileIndex: 0
        };
    },

    getInitialState() {
        return {
            generatorModel: this.getInitialScenarioGeneratorModel(),
            scenarioName: "",
            scenarios: []
        }
    },

    loadScenario() {
        jquery.get( "http://localhost:3001/scenarios/" + this.state.scenarioName, function( data ) {
            this.setState({
                scenarios: data.scenarios
            });
        }.bind(this));
    },

    updateScenarioName(event) {
        this.setState({scenarioName: event.target.value});
    },

    render() {
        /*
        original save button:
         <div>
         <button type="button" onClick={this.saveCurrentStateToFile}>SAVE</button>
         <label>Scenario:</label>
         <input type="text" onBlur={this.setScenarioName}/>
         </div>
         */
        return (
            <div>
                <ScenarioGenerator scenario={this.state.generatorModel}/>
                <div>
                    <button type="button" onClick={this.loadScenario}>LOAD</button>
                    <label>Scenario:</label>
                    <input type="text" value={this.state.scenarioName} onChange={this.updateScenarioName}/>
                </div>
                <ScenarioList scenarios={this.state.scenarios}/>
            </div>
        );
    }
});

export default App;
