import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import client from "./client";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import ThemeContext from './ThemeContext';

class Details extends Component {
    state = { loading: true, showModal: false };

    async componentDidMount() {
        const { data: { animal } } = await client.animal.show(this.props.match.params.id);
        this.setState(Object.assign({ loading: false }, animal))
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal });
    adopt = () => (window.location = "http://bit.ly/pet-adopt");

    render() {
        if (this.state.loading) {
            return <h2>loading ...</h2>
        }

        const { type, breeds, contact: { address: { city, state } }, description, name, photos, showModal } = this.state;

        return (
            <div className="details">
                <Carousel images={photos} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${type} — ${breeds.primary} — ${city}, ${state}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button onClick={this.toggleModal} style={{ backgroundColor: theme }}>Adopt {name}</button>
                        )}
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {name}?</h1>
                                    <div className="buttons">
                                        <button onClick={this.adopt}>Yes</button>
                                        <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <DetailsWithRouter {...props} />
        </ErrorBoundary>
    )
}