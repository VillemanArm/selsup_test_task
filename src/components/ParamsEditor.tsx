import React from 'react';  
import {  Param, ParamValue } from './Model';
import AppInput from './UI/AutoInput';

interface ParamEditorProps {
    param: Param;
    paramValues: ParamValue[];
    editModel: Function;
    addModel: Function;
}

interface ParamEditorState {
    // params: {id: number, name: string}[],
    // model: {}
}

class ParamEditor extends React.Component<ParamEditorProps, ParamEditorState> {    
    constructor(props: ParamEditorProps) {
        super(props);

        this.state = {
           

        };

        // this.getModel = this.getModel.bind(this);

    }
    
    render(): React.ReactNode {
        return (
            <div className="param-editor">
                <div className="param-editor__head">
                    <h3>{this.props.param.name}</h3>
                    <button 
                        className="param-editor__add" 
                        type='button' 
                        onClick={() => {this.props.addModel(this.props.param.id)}}
                        
                    >+</button>
                </div>
                <div>{this.props.paramValues.map(val => (
                    <div>
                        {/* <AppInput 
                            key={val.id}
                            id={val.id}
                            value={val.value} 
                            handleInput={this.props.editModel}
                        /> */}
                        <button type='button'>-</button>
                    </div>))}
                </div>
            </div>
        )
    }
    
}

export default ParamEditor
