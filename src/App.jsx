import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import NavItem from "./NavItem";

import DynamicComponentsExample from "./dynamicComponentExample/DynamicComponentsExample";
import RichComponentsExample from "./richComponentExample/RichComponentsExample";
import EditorComponentsExample from "./editorComponentExample/EditorComponentsExample";
import FloatingRowComponentExample from "./floatingRowExample/FloatingRowComponentExample";
import FullWidthComponentExample from "./fullWidthExample/FullWidthComponentExample";
import GroupedRowInnerRendererComponentExample from "./groupedRowInnerRendererExample/GroupedRowInnerRendererComponentExample";
import FilterComponentExample from "./filterComponentExample/FilterComponentExample";
import RichGridExample from "./richGridExample/RichGridExample";
import MasterDetailExample from "./masterDetailExample/MasterDetailExample";

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
        </ul>
    </header>
);

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Redirect from="/" exact to="/rich-grid"/>
                    <Route exact path='/rich-grid' component={RichGridExample}/>
                    <Route exact path='/dynamic' component={DynamicComponentsExample}/>
                    <Route exact path='/rich-dynamic' component={RichComponentsExample}/>
                    <Route exact path='/editor' component={EditorComponentsExample}/>
                    <Route exact path='/floating-row' component={FloatingRowComponentExample}/>
                    <Route exact path='/full-width' component={FullWidthComponentExample}/>
                    <Route exact path='/group-row' component={GroupedRowInnerRendererComponentExample}/>
                    <Route exact path='/filter' component={FilterComponentExample}/>
                    <Route exact path='/master-detail' component={MasterDetailExample}/>
                </Switch>
            </div>
        )
    }
}

export default App
