import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';
require('dotenv').config();

class ContentShortner extends Component {
    constructor(props){
        super(props)

        this.state = {
            user_id: '1',
            url: '',
            link: '',
            copied: false,
            linkShortner: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        this.setState({copied: false});
        const strings = "abcdefghifklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let text = "";
        for(let i = 0; i < 8; i++) {
            text += strings.charAt(Math.floor(Math.random() * strings.length));
        }

        this.setState({link: this.state.link = text});
        this.setState({linkShortner: this.state.linkShortner = "http://localhost:3030/api/" + this.state.link});

        e.preventDefault();
        console.log(this.state);
        axios.post("http://localhost:3030/api/link/", this.state)
           .then(response => { 
               console.log(response)
           })
           .catch(error => {
               console.log(error);
           });
    }

    render () {
        const { user_id, url, link, linkShortner } = this.state;
        return (
            <div className="container">
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Insira o link para ser encurtado</Form.Label>
                        <Form.Control required
                        name="url" 
                        placeholder="Link" 
                        value={url}
                        onChange={this.changeHandler} />
                    </Form.Group>
                    <input type="text" hidden
                        value={user_id}
                        onChange={this.changeHandler}
                        name="user_id" />
                    <Button type="submit" variant="secondary" size="lg" block>
                        Encurtar
                    </Button>
                </Form>
                <br>
                </br>
                {
                link.length > 0 &&
                    <div>
                        
                        Seu link foi encurtado com sucesso! Acesse <a href={this.state.linkShortner}>aqui</a> para acessa-lo.
                        <br></br>                   
                        <a href={linkShortner}>{linkShortner}</a>
                        <CopyToClipboard text={this.state.linkShortner}
                            onCopy={() => this.setState({copied: true})}>
                            <button> Copiar</button>
                        </CopyToClipboard>

                        {this.state.copied ? <span style={{color: 'red'}}> Copiado.</span> : null}
                    </div>
                }
            </div>
        );
    }
}

export default ContentShortner