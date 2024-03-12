/* сборка компонентов приложения а так же общее для них состояние и методы. 
Так как в задаче компонент один, я расположил state в нем, чтобы лишний раз не 
прокидывать пропсы.*/

import React from 'react';  
import './css/style.sass';
import Model from './components/Model';

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {    
   
    render(): React.ReactNode {
        return (
            <div className="app">
                <Model />
            </div>
        )
    }

}

export default App;

