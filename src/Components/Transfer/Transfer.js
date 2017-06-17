import React from "react";
import PropTypes from "prop-types";
import { CheckBox } from "../CheckBox/CheckBox";
import { Badge } from "../Badge/Badge";

export class Transfer extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            sSource: [],
            sTarget: []
        }
    }

    onChangeHandler = ( value ) => {
        if ( typeof this.props.onChange === "function" ) this.props.onChange( value )
    };

    selectAllSourses = () => {
        const sourses = this.props.source.filter( s => this.props.target.every( t => t !== s ) ).map( s => s.id );
        this.setState( { sSource: sourses.every( s => this.state.sSource.some( ss => ss === s ) ) ? [] : sourses } )
    };

    selectAllTargets = () => {
        const target = this.props.target;
        this.setState( { sTarget: target.every( t => this.state.sTarget.some( st => st === t ) ) ? [] : target } )
    };

    selectSourceHandler = id => {
        const source = this.state.sSource;
        this.setState( { sSource: source.some( s => s === id ) ? source.filter( s => s !== id ) : source.concat( [ id ] ) } )
    };

    selectTargetHandler = id => {
        const target = this.state.sTarget;
        this.setState( { sTarget: target.some( t => t === id ) ? target.filter( t => t !== id ) : target.concat( [ id ] ) } )
    };

    transferToTargetHandler = () => {
        const value = (this.props.target || []).concat( this.state.sSource );
        this.onChangeHandler( this.props.name ? { [this.props.name]: value } : value );
        this.state.sSource = []
    };

    transferToSourceHandler = () => {
        const value = (this.props.target || []).filter( t => this.state.sTarget.every( s => s !== t ) );
        this.onChangeHandler( this.props.name ? { [this.props.name]: value } : value );
        this.state.sTarget = []
    };

    sourceRender = ( checkedAll, disabledAll ) => {
        const { source, target, tableView, columns } = this.props;

        if ( tableView && columns ) {
            return <div style={{overflow:"hidden",flex:1}}>
                <table style={{width:"100%", borderBottom:"1px solid #d9d9d9"}}>
                    <thead>
                    <tr>
                        {[
                            <th key={Math.random()} style={{width:"10%"}}>
                                <CheckBox
                                    checked={checkedAll}
                                    disabled={disabledAll}
                                    onClickHandler={this.selectAllSourses}
                                />
                            </th>,

                            columns.map( item => {
                                return this.tableHeaderRowRender( item )
                            } ) ]}
                    </tr>
                    </thead>
                </table>
                <div style={{overflow:"scroll",height:"209px"}}>
                    <table style={{width:"100%"}}>
                        <tbody>
                        {this.tableRowRender(source,target)}
                        </tbody>
                    </table>
                </div>

            </div>
        }

        return source.filter( s => target.every( t => s.id !== t ) ).map( ( item, i ) => {
            const checked = this.state.sSource.some( s => s === item.id )
            return this.singleCheckboxRender( this.selectSourceHandler.bind( this, item.id ), checked, item, i )
        } )
    };

    targetRender = () => {
        const { source, target } = this.props;


        return source.filter( s => target.some( t => s.id === t ) ).map( ( item, i ) => {
            const checked = this.state.sTarget.some( t => t === item.id )
            return this.singleCheckboxRender( this.selectTargetHandler.bind( this, item.id ), checked, item, i )
        } )
    };


    tableHeaderRowRender = ( item ) => {
        return <th key={Math.random()} style={{width:item.width +"%", textAlign:item.align || "center", padding:"0 10px"}}>{item.label}</th>
    }

    tableRowRender = ( source, target ) => {
        return source.filter( s => target.every( t => s.id !== t ) ).map( ( item, i ) => {
            const checked = this.state.sSource.some( s => s === item.id )

            return  <tr key={i}>
                {[
                    <td style={{ margin: "5px 0px", width:"10%" }} key={Math.random()}>
                        <CheckBox checked={checked} onClickHandler={this.selectSourceHandler.bind( this, item.id )}/>
                    </td>,
                    this.props.columns.map(col=>{
                        return  <td key={Math.random()} style={{width:col.width + "%", textAlign:col.align || "center", padding:"0 10px"}}>
                            {item[col.key]}
                        </td>
                    })
                ]}
            </tr>

        } )
    }


    singleCheckboxRender = ( onChangeHandler, checked, item, i ) => {
        const { customRecordRenderer } = this.props;
        if ( typeof customRecordRenderer === "function" ) {
            return customRecordRenderer( onChangeHandler, checked, item, i )
        } else {
            return <div style={{ margin: "5px 0px" }} key={i}>
                <CheckBox checked={checked} onClickHandler={onChangeHandler} label={item.value}/>
            </div>
        }
    };

    isSourceNotEmpty = () => {
        return this.state.sSource.length
    };

    isTargetNotEmpty = () => {
        return this.state.sTarget.length
    };

    render() {
        const { source, target, direction, tableView, sourceName } = this.props;
        const sourceWithoutTarget                      = source.filter( s => target.every( t => s.id !== t ) );

        const targetCheckbox = this.props.target && this.props.target.length > 0 && this.props.target.every( t => this.state.sTarget.some( st => st === t ) );
        const sourceCheckbox = sourceWithoutTarget && sourceWithoutTarget.length > 0 && sourceWithoutTarget.every( s => this.state.sSource.some( ss => ss === s.id ) );

        return (
            <div className={`reactParts__transfer--wrap ${direction}`}>
                {tableView && <div>{sourceName} <Badge
                    count={this.state.sSource.length}
                    ofCount={sourceWithoutTarget.length}
                    showZero={true}
                /></div> }
                <div className={`reactParts__transfer--box reactParts__transfer--box-${direction}`}>
                    {!tableView && <div className="reactParts__transfer--header">
                        <CheckBox
                            label={this.props.sourceName}
                            checked={sourceCheckbox}
                            disabled={sourceWithoutTarget.length === 0}
                            onClickHandler={this.selectAllSourses}
                        />

                        <Badge
                            count={this.state.sSource.length}
                            ofCount={sourceWithoutTarget.length}
                            showZero={true}
                        />
                    </div>}

                    <div className={`reactParts__transfer--list reactParts__transfer--list-${direction}`}>
                        {this.sourceRender( sourceCheckbox, sourceWithoutTarget.length === 0 )}
                    </div>
                </div>

                <div className={`reactParts__transfer--middle-box reactParts__transfer--middle-box-${direction}`}>
                    <div className="reactParts__transfer--middle-box-button">
                        <div
                            className={"reactParts__transfer--middle-box-button-icon " + (!this.isSourceNotEmpty() ? "disabled" : "")}
                            onClick={this.transferToTargetHandler}
                        >
                            {direction === "vertical" ?
                                <svg
                                    fill="#d9d9d9"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
                                    <path d="M0-.75h24v24H0z" fill="none"/>
                                </svg> :
                                <svg
                                    fill="#d9d9d9"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                                    <path d="M0-.25h24v24H0z" fill="none"/>
                                </svg>
                            }
                        </div>
                    </div>

                    <div className="reactParts__transfer--middle-box-button">
                        <div
                            className={"reactParts__transfer--middle-box-button-icon " + (!this.isTargetNotEmpty() ? "disabled" : "")}
                            onClick={this.transferToSourceHandler}
                        >
                            {direction === "vertical" ?
                                <svg
                                    fill="#d9d9d9"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                </svg> :
                                <svg
                                    fill="#d9d9d9"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                                    <path d="M0-.5h24v24H0z" fill="none"/>
                                </svg>
                            }
                        </div>
                    </div>
                </div>

                <div className={`reactParts__transfer--box reactParts__transfer--box-${direction}`}>
                    <div className="reactParts__transfer--header">
                        <CheckBox
                            label={this.props.targetName}
                            checked={targetCheckbox}
                            disabled={target.length === 0}
                            onClickHandler={this.selectAllTargets}
                        />

                        <Badge
                            count={this.state.sTarget.length}
                            ofCount={target.length}
                            showZero={true}
                        />
                    </div>

                    <div className={`reactParts__transfer--list reactParts__transfer--list-${direction}`}>
                        {this.targetRender()}
                    </div>
                </div>
            </div>
        )
    }
}

Transfer.propTypes = {
    customRecordRenderer: PropTypes.func,
    targetName:           PropTypes.string,
    sourceName:           PropTypes.string,
    direction:            PropTypes.oneOf( [ "vertical", "horizontal" ] ),
    onChange:             PropTypes.func,
    target:               PropTypes.array,
    source:               PropTypes.array,
    name:                 PropTypes.string,
    tableView:            PropTypes.bool,
    columns:              PropTypes.array,
    footer:               PropTypes.bool
};


Transfer.defaultProps = {
    source:    [],
    target:    [],
    direction: "horizontal",
    tableView: false,
    columns:   null,
    footer:    false
};

