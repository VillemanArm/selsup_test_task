import React from 'react';  
import './css/style.sass';
import Model from './components/Model';

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {    
    constructor(props: AppProps) {
        super(props);

        this.state = {
           
        }


        //this.getModel = this.getModel.bind(this);

    }
    
    render(): React.ReactNode {
        return (
            <div className="app">
                <Model />
            </div>
        )
    }

}

export default App;

