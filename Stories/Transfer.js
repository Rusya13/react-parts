import React from "react";
import { Transfer } from "../dist";

export class TransferController extends React.Component {
    constructor( props ) {
        super( props )

        this.state = {
            source: [
                { name: "Test_name1",id: 1, value: "lighthouse" },
                { name: "Test_name2",id: 2, value: "acquire knowledge" },
                { name: "Test_name3",id: 3, value: "fairy" },
                { name: "Test_name4",id: 4, value: "entitle to" },
                { name: "Test_name5",id: 5, value: "soccer" },
                { name: "Test_name", id: 6, value: "to be entitled to" },
                { name: "Test_name", id: 7, value: "cheek" },
                { name: "Test_name", id: 8, value: "awesome" },
                { name: "Test_name", id: 11, value: "mediocre" },
                { name: "Test_name", id: 12, value: "spare smb`s feelings" },
                { name: "Test_name", id: 13, value: "nail polish" },
                { name: "Test_name", id: 14, value: "bitter" },
                { name: "Test_name", id: 15, value: "fond hope" },
                { name: "Test_name", id: 16, value: "picky" },
                { name: "Test_name", id: 17, value: "spare time" },
                { name: "Test_name", id: 18, value: "compulsory" },
                { name: "Test_name", id: 21, value: "merely" },
                { name: "Test_name", id: 22, value: "glorious" },
                { name: "Test_name", id: 23, value: "weapon" },
                { name: "Test_name", id: 24, value: "severe" },
                { name: "Test_name", id: 25, value: "quote" },
                { name: "Test_name", id: 26, value: "menace" },
                { name: "Test_name", id: 27, value: "lineage" },
                { name: "Test_name", id: 28, value: "laborious" },
            ],
            target: [
            ]
        }
    }

    getColumns=()=>{
        return [
            {key: "id", label:"ID", width: 10, align:"right", footerType: 'avg' },
            {key: "name", label:"Name", width: 40, align:"left", footerType: 'count' },
            {key: "value", label:"Value", width: 25, align:"left", footerType: 'count'  }
        ]
    };

    onChange = e => {
        this.setState( { target: e.test } )
    }

    render() {
        return (
            <div>
                <Transfer
                    size="small"
                    name="test"
                    source={this.state.source}
                    target={this.state.target}
                    onChange={this.onChange}
                    direction="horizontal"
                    tableView
                    footer
                    sourceName="Список прав"
                    targetName="Права группы"
                    columns={this.getColumns()}
                />
            </div>
        )
    }

}