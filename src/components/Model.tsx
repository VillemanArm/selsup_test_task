/*Основной компонент.
Вся логика задания в этом файле. Отдельно вынес только AutoInput, чтобы показать работу 
с компонентами.
*/

import React from 'react';  
import AutoInput from './UI/AutoInput';
import { ImPlus, ImMinus } from "react-icons/im"

export interface Param {
   id: number;
   name: string;
}

export interface ParamValue {
    paramId: number,
    value: string,
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
}


class ModelInterface extends React.Component<AppProps, AppState> {    
    constructor(props: AppProps) {
        super(props);

        this.state = {
            params: [  
                {    
                    id: 1,    
                    name: "Назначение"  
                },  
                {    
                    id: 2,    
                    name: "Длина"  
                },
                {    
                    id: 3,    
                    name: "Размер"  
                },
            ],
            model: {    
                paramValues: [
                    {      
                        paramId: 1,      
                        value: "повседневное"    
                    },    
                    {     
                        paramId: 2,      
                        value: "макси"    
                    },  
                ],

            },
            interfaceStructure: []

        }


        this.getInterfaceStructure = this.getInterfaceStructure.bind(this);
        this.editModelParamValues = this.editModelParamValues.bind(this);
        this.addModelParamValues = this.addModelParamValues.bind(this);
        this.delParam = this.delParam.bind(this);
    }

    private paramInput = React.createRef<HTMLInputElement>()
    
    render(): React.ReactNode {
        return (
            <div className="model-editor">
                <div className="model-editor__param-add model-editor__row">
                    <span>Новый параметр</span>
                    <input type="text" className='text-input' ref={this.paramInput}/>
                    <button 
                        type="button"
                        onClick={() => {
                            this.addParam(this.paramInput.current?.value)
                            if (this.paramInput.current?.value) {
                                this.paramInput.current.value = ''
                            }
                        }}
                    >                      
                        <ImPlus />
                    </button>
                </div>
                {this.state.interfaceStructure.map(item => (
                        <div key={item.id} className='model-editor__row'>
                            <span>{item.paramName}</span>
                            <AutoInput      // универсальный компонент, который может использоваться во всем проекте, поэтому вывел его в отдельный файл                           
                                id={item.id}
                                value={item.paramValue} 
                                placeholder='введите значение'
                                handleInput={this.editModelParamValues}
                            />
                            <button 
                                type="button"
                                onClick={() => {this.delParam(item.id)}}
                            >
                                <ImMinus />
                            </button>
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

    async componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<AppState>, snapshot?: any) {
        if (prevState.params !== this.state.params) {
            await this.addModelParamValues()
            await this.getInterfaceStructure() 
        }

        // не стал синхронизирвоать изменения значений параметров с interfaceStructure так как на данном этапе это лишний вызов функций, который не влияет на отображение
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
                newModel.paramValues.push({paramId: param.id, value: ""})               
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

    delParam(deletedId: number | string): void {
        let newParams: Param[] = [...this.state.params]
        newParams = newParams.filter(param => param.id !== deletedId)
        
        this.setState({params: [...newParams]})
    }
}

export default ModelInterface;

