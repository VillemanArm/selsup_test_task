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
        this.addModelParamValues = this.addModelParamValues.bind(this);
    }

    private paramInput = React.createRef<HTMLInputElement>()
    
    render(): React.ReactNode {
        return (
            <div className="model-editor">
                <div className="model-editor__param-add">
                    <span>Новый параметр</span>
                    <input type="text" ref={this.paramInput}/>
                    <button type="button"
                        onClick={() => {
                            this.addParam(this.paramInput.current?.value)
                            if (this.paramInput.current?.value) {
                                this.paramInput.current.value = ''
                            }
                        }}
                    >+</button>
                </div>
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

    async componentDidMount() {
        await this.addModelParamValues()
        await this.getInterfaceStructure()
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

    addModelParamValues():void {
        const newModel: Model = structuredClone(this.state.model)
        let isNewModelChanged: boolean = false 

        this.state.params.forEach(param => {
            if (!(newModel.paramValues.find(value => value.paramId === param.id))) {
                newModel.paramValues.push({"paramId": param.id, "value": ""})               
                isNewModelChanged = true 
            }
        })

        if (isNewModelChanged) {
            this.setState({model: newModel})
        }
    }

    addParam(newName: string | undefined): void {
        if (newName && !this.state.params.find(param => param.name === newName)) {
            const newParam: Param = {
                id: Date.now(),
                name: newName,
            }
    
            this.setState({params: [...this.state.params, newParam]})
        }
    }


}

export default ModelInterface;

