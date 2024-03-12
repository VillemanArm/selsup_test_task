import React from 'react';

interface InputProps {
    placeholder?: string;
    value?: string;
    id?: number | string;
    handleInput: Function;
}

class AppInput extends React.Component <InputProps, {}>{
    private input = React.createRef<HTMLInputElement>();

    debounce = (callback: Function, delay: number) => {
        let timeoutId: any;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
            callback.apply(this, args);
            }, delay);
        };
    };

    componentDidMount(): void {
        if (this.props.value && this.input.current) this.input.current.value = this.props.value;
    }


    render() {
        return (
            <input 
                ref={this.input}
                type="text" 
                className='text-input' 
                placeholder={this.props.placeholder}
                onInput={this.debounce((event: React.ChangeEvent<HTMLInputElement>) => {this.props.handleInput(event.target.value, this.props.id)}, 500)}
            ></input>
        );
    }
}

export default AppInput;