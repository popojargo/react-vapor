import {HTMLAttributes, mount, ReactWrapper, shallow} from 'enzyme';
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import {TestUtils} from '../../../utils/TestUtils';
import {ITabPaneProps, TabPane} from '../TabPane';

describe('TabPane', () => {
    const id: string = 'tab';

    describe('<TabPane />', () => {
        it('should render without errors', () => {
            expect(() => {
                shallow(
                    <TabPane
                        id={id}
                    />,
                );
            }).not.toThrow();
        });
    });

    describe('<Tab />', () => {
        let tab: ReactWrapper<ITabPaneProps, any>;
        let container: ReactWrapper<HTMLAttributes, any>;

        const refreshWrapperWhenDone = TestUtils.buildRefreshFunction(() => {
            container = tab.find('div').first();
        });

        beforeEach(() => {
            tab = mount(
                <TabPane
                    id={id}
                />,
                {attachTo: document.getElementById('App')},
            );
            refreshWrapperWhenDone(tab);
        });

        afterEach(() => {
            tab.unmount();
            tab.detach();
        });

        it('should set active class on container when isActive is true', () => {
            expect(container.hasClass('active')).toBe(false);

            refreshWrapperWhenDone(tab, () => tab.setProps({id, isActive: true}));

            expect(container.hasClass('active')).toBe(true);
        });

        it('should add classNames when className prop set', () => {
            refreshWrapperWhenDone(tab, () => tab.setProps({id, className: 'hello'}));

            expect(container.hasClass('hello')).toBe(true);
        });
    });
});
