import React, { Component } from 'react'
import styled               from 'styled-components'
import PropTypes            from 'prop-types'
import ExpandIcon           from 'react-icons/lib/md/add'
import CollapseIcon         from 'react-icons/lib/md/close'


const Container = styled.div`
    font-size: 14px;
    margin-top: 18px;
`

const Title = styled.span`
    margin-right: 12px;
    padding-bottom: 9px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    color: ${props => props.isOpened ? '#000' : '#777'};
`

const TabsContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 24px;
    margin-bottom: -1px;
`

const TabIndicator = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: ${props => props.tabWidth}px;
    background: #6f9ad1;
    transform: translate3d(${props => props.index * props.tabWidth}px, 0, 0);
    transition: transform 300ms cubic-bezier(0, 0, .2, 1);
`

const Header = styled.div`
    height: 24px;
    display: flex;
    align-items: center;
    line-height: 1em;
    margin: 9px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .07);
    user-select: none;
`

const Tab = styled.span`
    height: 24px;
    line-height: 1em;
    padding: 0 0 6px;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
    width: ${props => props.tabWidth}px;
    font-weight: ${props => props.isActive ? '600' : '400'};
    color: ${props => props.isActive ? '#17385d' : '#777'};
`

class Tabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentId: null,
            isOpened:  false,
        }
    }

    setDefaultId = ({ tabs }) => {
        const { currentId } = this.state

        if (currentId !== null || tabs.length === 0) return

        const ids = tabs.map(({ id }) => id)
        this.setState({ currentId: ids[0] })
    }

    componentDidMount = () => {
        this.setDefaultId(this.props)
    }

    componentWillReceiveProps = nextProps => {
        this.setDefaultId(nextProps)
    }

    handleIdUpdate = currentId => {
        this.setState({ currentId })
    }

    handleToggle = () => {
        const { isOpened } = this.state
        this.setState({ isOpened: !isOpened })
    }

    render() {
        const { title, tabs, tabWidth } = this.props

        if (tabs.length === 0) return null

        const { currentId, isOpened } = this.state

        const activeIndex = Math.max(tabs.map(({ id }) => id).indexOf(currentId), 0)
        const Icon        = isOpened ? CollapseIcon : ExpandIcon

        const currentTab = tabs.find(({ id }) => id === currentId)

        return (
            <Container>
                <Header>
                    <Title
                        onClick={this.handleToggle}
                        isOpened={isOpened}
                    >
                        <Icon size={16} style={{ marginRight: 6 }}/>
                        {title}
                    </Title>
                    {isOpened && (
                        <TabsContainer>
                            {tabs.map(tab => (
                                <Tab
                                    key={tab.id}
                                    isActive={tab.id === currentId}
                                    onClick={() => { this.handleIdUpdate(tab.id) }}
                                    tabWidth={tabWidth}
                                >
                                    {tab.label}
                                </Tab>
                            ))}
                            <TabIndicator index={activeIndex} tabWidth={tabWidth}/>
                        </TabsContainer>
                    )}
                </Header>
                {isOpened && currentTab && currentTab.render()}
            </Container>
        )
    }
}

Tabs.propTypes = {
    title:    PropTypes.string.isRequired,
    tabWidth: PropTypes.number.isRequired,
    tabs:     PropTypes.arrayOf(
        PropTypes.shape({
            id:     PropTypes.any.isRequired,
            label:  PropTypes.node.isRequired,
            render: PropTypes.func.isRequired,
        })
    ).isRequired,
}

Tabs.defaultProps = {
    tabWidth: 70,
}

export default Tabs
