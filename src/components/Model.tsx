import React from 'react';  
import AutoInput from './UI/AutoInput';

export interface Param {
   id: number;
   name: string;
  //  type: string;
}

export interface ParamValue {
    paramId: number,
    value: string,
    // id: number,
}

interface Model {
    paramValues: ParamValue[];
} 

interface ParamItem {
    id: number | string,
    paramName: string,
    paramValue: string, 
}

interface AppState {
    params: Param[],
    model: Model,
    interfaceStructure: ParamItem[] 
}

interface AppProps {
    // params: Param[];
    // model: Model;
}


class ModelInterface extends React.Component<AppProps, AppState> {    
    constructor(props: AppProps) {
        super(props);

        this.state = {
            params: [  
                {    
                    "id": 1,    
                    "name": "Назначение"  
                },  
                {    
                    "id": 2,    
                    "name": "Длина"  
                },
                {    
                    "id": 3,    
                    "name": "Размер"  
                },
            ],
            model: {    
                paramValues: [
                    {      
                        "paramId": 1,      
                        "value": "повседневное"    
                    },    
                    {     
                        "paramId": 2,      
                        "value": "макси"    
                    },  
                ],

            },
            interfaceStructure: []

            }


        this.getInterfaceStructure = this.getInterfaceStructure.bind(this);
        this.editModelParamValues = this.editModelParamValues.bind(this);
        // this.addModel = this.addModel.bind(this);
    }
    
    render(): React.ReactNode {
        return (
            <div className="">
                {this.state.interfaceStructure.map(item => (
                        <div key={item.id}>
                            <span>{item.paramName}</span>
                            <AutoInput                                 
                                id={item.id}
                                value={item.paramValue} 
                                handleInput={this.editModelParamValues}
                            />
                        </div>
                        )
                )}
                
            </div>
        )
    }

    componentDidMount(): void {
        this.getInterfaceStructure()
    }
    
    // getInterfaceStructure делает то, что должен был делать getModel - собирать структуру для интерфейса. Такое название показалось мне логичнее
    getInterfaceStructure(): void {
        const newInterfaceStructure: ParamItem[] = []
        this.state.params.forEach(param => {
            const paramValue: string = this.state.model.paramValues.find(item => item.paramId === param.id)?.value || ''
            const newParamItem: ParamItem = {
                id: param.id,
                paramName: param.name,
                paramValue 
            }
            newInterfaceStructure.push(newParamItem)
        })  
        
        this.setState({interfaceStructure: [...newInterfaceStructure]})
    }

    editModelParamValues(newValue: string, id: number | string): void {
        const newModel = structuredClone(this.state.model)
        const index = newModel.paramValues.findIndex((value: ParamValue) => value.paramId === id)
        newModel.paramValues[index].value = newValue
        
        this.setState({model: structuredClone(newModel)})
        
    }

    // addModel(paramId: number):void {
    //     const newParamValue: ParamValue = {
    //         paramId,
    //         value: '',
    //     }

    //     this.setState({model: [...this.state.model, newParamValue]})
    // }


}

export default ModelInterface;

