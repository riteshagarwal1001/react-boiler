import * as React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { TESideBarComponentProps } from '../../../common/interfaces';

const SideBar = (props: TESideBarComponentProps) => {
    const {
        activeTab,
        sideBarTabOptions,
        handleChangeTab,
        isTabVisibleFunc,
    } = props;
    return (
        <ListGroup>
            {sideBarTabOptions.map(
                (sideBarTabKey: { tabKey: string; tabDisplay: string }) => {
                    if (
                        isTabVisibleFunc &&
                        !isTabVisibleFunc(sideBarTabKey.tabKey)
                    ) {
                        return null;
                    }
                    return (
                        <ListGroupItem
                            id={sideBarTabKey.tabKey}
                            key={sideBarTabKey.tabKey}
                            className={
                                activeTab === sideBarTabKey.tabKey
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                handleChangeTab(sideBarTabKey.tabKey)
                            }
                        >
                            {sideBarTabKey.tabDisplay}
                        </ListGroupItem>
                    );
                },
            )}
        </ListGroup>
    );
};

export default SideBar;
