import { Component } from "react";

class Carousel extends Component {
    state = {
        active: 0
    };

    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
    };

    handleIndexClick = event => {
        this.setState({
            active: +event.target.dataset.index
        });
    }

    render() {
        const { active } = this.state;
        let { images } = this.props;
        if (images.length === 0) {
            images = Carousel.defaultProps.images;
        }
        return (
            <div className="carousel">
                <img src={images[active].full} alt="animal" />
                <div className="carousel-smaller">
                    {images.map((photo, index) => (
                        <img
                            key={photo.full}
                            src={photo.full}
                            onClick={this.handleIndexClick}
                            data-index={index}
                            className={index === active ? "active" : ""}
                            alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        )
    }

}

export default Carousel;