import _ from 'lodash'

const Row = ({ children }) => {
    return (
        <div className="row">
            {children}
            <style jsx>{`
                .row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                }
            `}</style>
        </div>
    )
}

const Left = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

const Right = ({ children }) => {
    return (
        <div className="cell">
            {children}
            <style jsx>{`
                .cell {
                    background: #17385d;
                    color: #bbc9d7;
                    padding: 0 12px;
                }
            `}</style>
        </div>
    )
}

const Parameter = ({ parameter }) => {
    return (
        <Row>
            <Left>
                <div className="name">{parameter.name}</div>
            </Left>
            <Right>
                <div>other</div>
            </Right>
            <style jsx>{`
                .name {
                    font-family: 'Fira Mono', monospace;
                    font-weight: 500;
                }
            `}</style>
        </Row>
    )
}

const Parameters = ({ parameters }) => {
    const parametersByLocation = _.groupBy(parameters, 'in')

    let pathParameters = null
    if (parametersByLocation.path) {
        pathParameters = (
            <div>
                <Row>
                    <Left>
                        <h5 className="header">Path parameters</h5>
                    </Left>
                    <Right/>
                </Row>
                {parametersByLocation.path.map(param => (
                    <Parameter key={param.name} parameter={param}/>
                ))}
                <style jsx>{`
                    .header {
                        margin: 0;
                        padding: 0;
                    }
                `}</style>
            </div>
        )
    }

    return (
        <div>
            {pathParameters}
        </div>
    )
}

export default ({ operation }) => {
    return (
        <div className="operation">
            <Row>
                <Left>
                    <div className="header header--main summary">
                        {operation.summary}
                    </div>
                </Left>
                <Right>
                    <div className="header">
                        <div className="method">
                            {operation.method}
                        </div>
                        <div className="path">
                            {operation.path}
                        </div>
                    </div>
                </Right>
            </Row>
            <Parameters parameters={operation.parameters}/>
            <style jsx>{`
                .operation {
                    font-size: 14px;
                }
                .header {
                    display: flex;
                    align-items: center;
                    height: 48px;
                }
                .header--main {
                    border-bottom: 1px solid #ddd;
                }
                .method {
                    font-weight: 700;
                    text-transform: uppercase;
                    background: #3e6096;
                    width: 56px;
                    border-radius: 2px;
                    margin-right: 12px;
                    padding: 6px 9px;
                    font-size: 10px;
                    color: #0f2740;
                    line-height: 1em;
                }
                .path {
                    font-weight: 600;
                }
                .summary {
                    font-size: 16px;
                    font-weight: 600;
                }
            `}</style>
        </div>
    )
}