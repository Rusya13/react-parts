import React from "react";
import PropTypes from "prop-types";

export class Badge extends React.Component {


    render() {
        let count     = this.props.count;
        let maxCount  = this.props.maxCount;
        let showZero  = this.props.showZero;
        let style     = this.props.style;
        let className = this.props.className;
        let ofCount   = this.props.ofCount;
        if ( !showZero && count === 0 ) return null;
        return (
            <span className={className} style={style}>
                {
                    (ofCount)?(count+"/"+ofCount):
                        ((maxCount && count > maxCount) ?
                        (maxCount + "+")
                        : count)
                }
            </span>
        )
    }
}


Badge.defaultProps = {
    className: "reactParts__badge--wrap"
}

Badge.propTypes = {
    count:     PropTypes.number,
    status:    PropTypes.bool,
    showZero:  PropTypes.bool,
    maxCount:  PropTypes.number,
    style:     PropTypes.object,
    className: PropTypes.string,
    ofCount:   PropTypes.number
};