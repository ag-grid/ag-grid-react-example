import React, {Component} from "react";
import {Route, Switch, NavLink, Redirect} from "react-router-dom";

import NavItem from "./NavItem";

import DynamicComponentsExample from "./dynamicComponentExample/DynamicComponentsExample";
import RichComponentsExample from "./richComponentExample/RichComponentsExample";
import EditorComponentsExample from "./editorComponentExample/EditorComponentsExample";

const Header = () => (
    <header>
        <ul className="nav nav-pills">
            <NavItem to='/rich-grid'>Rich Grid Example</NavItem>
            <NavItem to='/dynamic'>Dynamic React Component Example</NavItem>
            <NavItem to='/rich-dynamic'>Dynamic React Components - Richer Example</NavItem>
            <NavItem to='/editor'>Cell Editor Component Example</NavItem>
            <NavItem to='/floating-row'>Floating Row Renderer Example</NavItem>
            <NavItem to='/full-width'>Full Width Renderer Example</NavItem>
            <NavItem to='/group-row'>Grouped Row Inner Renderer Example</NavItem>
            <NavItem to='/filter'>Filters Component Example</NavItem>
            <NavItem to='/master-detail'>Master Detail Example</NavItem>
            <NavItem to='/grouped-data'>Grouped Data Example</NavItem>
        </ul>
    </header>
)

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Redirect from="/" exact to="/dynamic" />
                    {/*<Route exact path='/rich-dynamic' component={DynamicComponentsExample}/>*/}
                    <Route exact path='/dynamic' component={DynamicComponentsExample}/>
                    <Route exact path='/rich-dynamic' component={RichComponentsExample}/>
                    <Route exact path='/editor' component={EditorComponentsExample}/>
                    {/*<Route exact path='/floating-row' component={RichComponentsExample}/>*/}
                    {/*<Route exact path='/full-width' component={RichComponentsExample}/>*/}
                    {/*<Route exact path='/group-row' component={RichComponentsExample}/>*/}
                    {/*<Route exact path='/filter' component={RichComponentsExample}/>*/}
                    {/*<Route exact path='/master-detail' component={RichComponentsExample}/>*/}
                    {/*<Route exact path='/grouped-data' component={RichComponentsExample}/>*/}
                </Switch>
            </div>
        )
    }
}

export default App
