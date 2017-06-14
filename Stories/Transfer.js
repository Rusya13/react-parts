import React from "react";
import { Transfer } from "../dist";

export class TransferController extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            source:[
                { id: 1,  value: "lighthouse"  }, { id: 2,  value: "acquire knowledge"    },
                { id: 3,  value: "fairy"       }, { id: 4,  value: "entitle to"           },
                { id: 5,  value: "soccer"      }, { id: 6,  value: "to be entitled to"    },
                { id: 7,  value: "cheek"       }, { id: 8,  value: "awesome"              },
                { id: 11, value: "mediocre"    }, { id: 12, value: "spare smb`s feelings" },
                { id: 13, value: "nail polish" }, { id: 14, value: "bitter"               },
                { id: 15, value: "fond hope"   }, { id: 16, value: "picky"                },
                { id: 17, value: "spare time"  }, { id: 18, value: "compulsory"           },
                { id: 21, value: "merely"      }, { id: 22, value: "glorious"             },
                { id: 23, value: "weapon"      }, { id: 24, value: "severe"               },
                { id: 25, value: "quote"       }, { id: 26, value: "menace"               },
                { id: 27, value: "lineage"     }, { id: 28, value: "laborious"            },
            ],
            target:[]
        }
    }


    onChange = e => {console.log("onChange", e)
        this.setState({ target: e.test })
    }

    render() {
        return(
            <div>
                <Transfer
                    name       = "test"
                    source     = {this.state.source}
                    target     = {this.state.target}
                    onChange   = {this.onChange}
                    direction  = "vertical"
                    sourceName = "Список прав"
                    targetName = "Права группы"
                />
            </div>
        )
    }

}