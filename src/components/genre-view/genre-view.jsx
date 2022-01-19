import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
    render() {
        const { genre } = this.props;

        return (
            <div className="genre-view">
                <div className="genre-name">
                    <span className="label">Name: </span>
                    <span className="value">{genre.Name}</span>
                </div>
                <div className="genre-description">
                    <span className="label">Description: </span>
                    <span className="value">{genre.Description}</span>
                </div>
            </div>
            <Link to={`/`}>
                <Button>Return to Movies</Button>
            </Link>
        )
    }
}