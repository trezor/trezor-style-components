import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import P from '../Paragraph';
import { H2 } from '../Heading';
import Link from '../Link';
import ButtonText from '../buttons/ButtonText';

import PinButton from './components/Button';
import PinInput from './components/Input';

const Wrapper = styled.div`
    padding: 24px 48px;
`;

const InputRow = styled.div`
    margin-top: 24px;
    max-width: 260px;
`;

const PinRow = styled.div``;

const StyledP = styled(P)`
    padding-top: 5px;
`;

const StyledLink = styled(Link)`
    padding-left: 5px;
`;

const Footer = styled.div`
    margin: 20px 0 10px 0;
    display: flex;
    flex-direction: column;
`;

class Pin extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pin: '',
        };
    }

    componentWillMount() {
        this.keyboardHandler = this.keyboardHandler.bind(this);
        window.addEventListener('keydown', this.keyboardHandler, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardHandler, false);
    }

    onPinAdd = (input) => {
        let { pin } = this.state;
        if (pin.length < 9) {
            pin += input;
            this.setState({
                pin,
            });
        }
    }

    onPinBackspace = () => {
        this.setState(previousState => ({
            pin: previousState.pin.substring(0, previousState.pin.length - 1),
        }));
    }

    keyboardHandler(event) {
        const { onPinSubmit } = this.props;
        const { pin } = this.state;

        event.preventDefault();
        switch (event.keyCode) {
            case 13:
                // enter,
                onPinSubmit(pin);
                break;
            // backspace
            case 8:
                this.onPinBackspace();
                break;

            // numeric and numpad
            case 49:
            case 97:
                this.onPinAdd(1);
                break;
            case 50:
            case 98:
                this.onPinAdd(2);
                break;
            case 51:
            case 99:
                this.onPinAdd(3);
                break;
            case 52:
            case 100:
                this.onPinAdd(4);
                break;
            case 53:
            case 101:
                this.onPinAdd(5);
                break;
            case 54:
            case 102:
                this.onPinAdd(6);
                break;
            case 55:
            case 103:
                this.onPinAdd(7);
                break;
            case 56:
            case 104:
                this.onPinAdd(8);
                break;
            case 57:
            case 105:
                this.onPinAdd(9);
                break;
            default: break;
        }
    }

    render() {
        const { device, onPinSubmit } = this.props;
        const { pin } = this.state;
        return (
            <Wrapper>
                {
                    this.props.header ? (
                        <React.Fragment>
                            {this.props.header}
                        </React.Fragment>
                        )
                    : (
                        <React.Fragment>
                            <H2>Enter { device.label } PIN</H2>
                            <P isSmaller>The PIN layout is displayed on your Trezor.</P>
                        </React.Fragment>
                    )
                }
                
                <InputRow>
                    <PinInput value={pin} onDeleteClick={() => this.onPinBackspace()} />
                </InputRow>
                <PinRow>
                    <PinButton type="button" data-value="7" onClick={() => this.onPinAdd(7)}>&#8226; </PinButton>
                    <PinButton type="button" data-value="8" onClick={() => this.onPinAdd(8)}>&#8226;</PinButton>
                    <PinButton type="button" data-value="9" onClick={() => this.onPinAdd(9)}>&#8226;</PinButton>
                </PinRow>
                <PinRow>
                    <PinButton type="button" data-value="4" onClick={() => this.onPinAdd(4)}>&#8226; </PinButton>
                    <PinButton type="button" data-value="5" onClick={() => this.onPinAdd(5)}>&#8226;</PinButton>
                    <PinButton type="button" data-value="6" onClick={() => this.onPinAdd(6)}>&#8226;</PinButton>
                </PinRow>
                <PinRow>
                    <PinButton type="button" data-value="1" onClick={() => this.onPinAdd(1)}>&#8226; </PinButton>
                    <PinButton type="button" data-value="2" onClick={() => this.onPinAdd(2)}>&#8226;</PinButton>
                    <PinButton type="button" data-value="3" onClick={() => this.onPinAdd(3)}>&#8226;</PinButton>
                </PinRow>
                <Footer>
                    <ButtonText type="button" onClick={() => onPinSubmit(pin)}>Enter PIN</ButtonText>
                    <StyledP isSmaller>Not sure how PIN works?
                        <StyledLink
                            isGreen
                            href="https://wiki.trezor.io/User_manual:Entering_PIN"
                        >Learn more
                        </StyledLink>
                    </StyledP>
                </Footer>
            </Wrapper>
        );
    }
}

Pin.propTypes = {
    device: PropTypes.object.isRequired,
    onPinSubmit: PropTypes.func.isRequired,
    header: PropTypes.object,
};

export default Pin;