import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import NavItem from "./NavItem";

import DynamicComponentsExample from "./dynamicComponentExample/DynamicComponentsExample";
import RichGridExample from "./richGridExample/RichGridExample";
import RichGridDeclarativeExample from "./richGridDeclarativeExample/RichGridDeclarativeExample";
import RichComponentsExample from "./richComponentExample/RichComponentsExample";
import EditorComponentsExample from "./editorComponentExample/EditorComponentsExample";
import PinnedRowComponentExample from "./pinnedRowExample/PinnedRowComponentExample";
import FullWidthComponentExample from "./fullWidthExample/FullWidthComponentExample";
import GroupedRowInnerRendererComponentExample from "./groupedRowInnerRendererExample/GroupedRowInnerRendererComponentExample";
import FilterComponentExample from "./filterComponentExample/FilterComponentExample";
import SimpleReduxExample from "./simpleReduxExample/SimpleReduxExample";
import FloatingFilterGridExample from "./floatingFilter/FloatingFilterGridExample";
import SimpleReduxDynamicExample from "./simpleReduxDynamicComponentExample/SimpleReduxExample";

const SideBar = () => (
        <div style={{float: "left", width: 335, marginRight: 25}}>
            <ul className="nav nav-pills nav-stacked">
                <NavItem to='/rich-grid'>Rich Grid Example</NavItem>
                <NavItem to='/rich-grid-declarative'>Rich Grid with Declarative Markup</NavItem>
                <NavItem to='/dynamic'>Dynamic React Component Example</NavItem>
                <NavItem to='/rich-dynamic'>Dynamic React Components - Richer Example</NavItem>
                <NavItem to='/editor'>Cell Editor Component Example</NavItem>
                <NavItem to='/floating-row'>Floating Row Renderer Example</NavItem>
                <NavItem to='/full-width'>Full Width Renderer Example</NavItem>
                <NavItem to='/group-row'>Grouped Row Inner Renderer Example</NavItem>
                <NavItem to='/filter'>Filters Component Example</NavItem>
                <NavItem to='/floating-filter'>Floating Filters</NavItem>
                <NavItem to='/simple-redux'>Simple Redux Example</NavItem>
                <NavItem to='/simple-redux-dynamic'>Simple Redux Dynamic Component Example</NavItem>
            </ul>
        </div>
);

class App extends Component {
    render() {
        return (
            <div style={{display: "inline-block", width: "100%"}}>
                <SideBar/>
                <div style={{float: "left"}}>
                    <Switch>
                        <Redirect from="/" exact to="/rich-grid"/>
                        <Route exact path='/rich-grid' component={RichGridExample}/>
                        <Route exact path='/rich-grid-declarative' component={RichGridDeclarativeExample}/>
                        <Route exact path='/dynamic' component={DynamicComponentsExample}/>
                        <Route exact path='/rich-dynamic' component={RichComponentsExample}/>
                        <Route exact path='/editor' component={EditorComponentsExample}/>
                        <Route exact path='/floating-row' component={PinnedRowComponentExample}/>
                        <Route exact path='/full-width' component={FullWidthComponentExample}/>
                        <Route exact path='/group-row' component={GroupedRowInnerRendererComponentExample}/>
                        <Route exact path='/filter' component={FilterComponentExample}/>
                        <Route exact path='/floating-filter' component={FloatingFilterGridExample}/>
                        <Route exact path='/simple-redux' component={SimpleReduxExample}/>
                        <Route exact path='/simple-redux-dynamic' component={SimpleReduxDynamicExample}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App
