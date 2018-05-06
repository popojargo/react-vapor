import {mount, ReactWrapper} from 'enzyme';
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import * as _ from 'underscore';
import {IReactVaporState} from '../../../../ReactVapor';
import {clearState, IReduxAction} from '../../../../utils/ReduxUtils';
import {TestUtils} from '../../../../utils/TestUtils';
import {addLoading, turnOffLoading} from '../../../loading/LoadingActions';
import {addPagination, changePage} from '../../pagination/NavigationPaginationActions';
import {INavigationPerPageProps, NavigationPerPage, PER_PAGE_NUMBERS} from '../NavigationPerPage';
import {changePerPage} from '../NavigationPerPageActions';
import {NavigationPerPageConnected} from '../NavigationPerPageConnected';
import {INavigationPerPageSelectProps, NavigationPerPageSelect} from '../NavigationPerPageSelect';

describe('<NavigationPerPageConnected />', () => {
    let wrapper: ReactWrapper<any, any>;
    let navigationPerPage: ReactWrapper<INavigationPerPageProps, any>;
    let store: Store<IReactVaporState>;
    let dispatchAction: (action: IReduxAction<any>) => void;
    const ID = 'navigation-per-page';
    const loadingId: string = `${ID}-loading`;
    const basicNavigationPerPageProps: INavigationPerPageProps = {
        totalEntries: 55,
        id: ID,
        loadingIds: [loadingId]
    };

    const refreshWrapperWhenDone = TestUtils.buildRefreshFunction((reactWrapper) => {
        navigationPerPage = reactWrapper.find(NavigationPerPage).first();
    });

    const mountWithProps = (props?) => {
        store.dispatch(addLoading(loadingId));
        store.dispatch(turnOffLoading([loadingId]));
        
        wrapper = mount(
            <Provider store={store}>
                <div>
                    <NavigationPerPageConnected {..._.extend({}, basicNavigationPerPageProps, props)} />
                </div>
            </Provider>,
            {attachTo: document.getElementById('App')},
        );
        
        dispatchAction = TestUtils.buildSafeDispatchFunction(store, wrapper, refreshWrapperWhenDone);
        refreshWrapperWhenDone(wrapper);
    };
    
    beforeEach(() => {
        store = TestUtils.buildStore();
        mountWithProps();
    });

    afterEach(() => {
        store.dispatch(clearState());
        wrapper.unmount();
        wrapper.detach();
    });

    it('should get the current perPageNumber as a prop', () => {
        const currentPerPageProp = () => navigationPerPage.props().currentPerPage;

        expect(currentPerPageProp()).toBeDefined();
        expect(currentPerPageProp()).toBe(10);

        dispatchAction(changePerPage(ID, 20));

        expect(currentPerPageProp()).toBe(20);

        dispatchAction(clearState());

        expect(currentPerPageProp()).toBe(PER_PAGE_NUMBERS[0]);

        const perPageNumbers: number[] = [11, 22, 33];

        wrapper.unmount();
        mountWithProps({perPageNumbers});

        dispatchAction(clearState());

        expect(currentPerPageProp()).toBe(perPageNumbers[0]);
    });

    it('should get what to do onRender as a prop', () => {
        const onRenderProp = navigationPerPage.props().onRender;

        expect(onRenderProp).toBeDefined();
    });

    it('should get what to do onDestroy as a prop', () => {
        const onDestroyProp = navigationPerPage.props().onDestroy;

        expect(onDestroyProp).toBeDefined();
    });

    it('should get what to do onPerPageClick as a prop', () => {
        const onPerPageClickProp = navigationPerPage.props().onPerPageClick;

        expect(onPerPageClickProp).toBeDefined();
    });

    it('should add itself to the store with its selected per page number on mount', () => {
        expect(_.findWhere(store.getState().perPageComposite, {id: basicNavigationPerPageProps.id})).toBeDefined();
    });

    it('should remove itself to the store when unmouting', () => {
        wrapper.unmount();
        expect(_.findWhere(store.getState().perPageComposite, {id: basicNavigationPerPageProps.id})).toBeUndefined();
    });

    it('should turn on loading and change the per page number when clicking on a <NavigationPerPageSelect /> link', () => {
        const perPageSelected = navigationPerPage.find('a').last();

        expect(_.findWhere(store.getState().loadings, {id: basicNavigationPerPageProps.loadingIds[0]}).isOn).toBe(false);

        perPageSelected.simulate('click');
        expect(_.findWhere(store.getState().perPageComposite, {id: basicNavigationPerPageProps.id}).perPage.toString()).toBe(perPageSelected.find('span').text());
        expect(_.findWhere(store.getState().loadings, {id: basicNavigationPerPageProps.loadingIds[0]}).isOn).toBe(true);
    });

    it('should not update the currentPerPage prop if a selected <NavigationPerPageSelect /> is clicked', () => {
        const perPageSelected = navigationPerPage.find('NavigationPerPageSelect').first();

        expect(_.findWhere(store.getState().perPageComposite, {id: basicNavigationPerPageProps.id}).perPage).toBe(10);

        perPageSelected.find('a').simulate('click');

        expect(_.findWhere(store.getState().perPageComposite, {id: basicNavigationPerPageProps.id}).perPage).toBe(10);
    });

    it('should update the currentPerPage prop if an unselected <NavigationPerPageSelect /> is clicked', () => {
        const perPageUnSelected = navigationPerPage.find('NavigationPerPageSelect').at(1);

        expect(_.findWhere(store.getState().perPageComposite, {id: basicNavigationPerPageProps.id}).perPage).toBe(10);

        perPageUnSelected.find('a').simulate('click');

        expect(_.findWhere(store.getState().perPageComposite, {id: basicNavigationPerPageProps.id}).perPage).toBe(20);
    });

    it('should change the page to the one starting with the same item as the previous per page when a new per page is' +
        'selected', () => {
            const paginationId: string = 'pagination-' + basicNavigationPerPageProps.id;
            const firstPerPage: ReactWrapper<INavigationPerPageSelectProps, any> =
                navigationPerPage.find(NavigationPerPageSelect).first() as ReactWrapper<INavigationPerPageSelectProps, any>;
            const secondPerPage: ReactWrapper<INavigationPerPageSelectProps, any> =
                navigationPerPage.find(NavigationPerPageSelect).at(1) as ReactWrapper<INavigationPerPageSelectProps, any>;
            const startingPage: number = 4;
            const expectedPage: number = Math.floor(startingPage * firstPerPage.props().perPageNb / secondPerPage.props().perPageNb);

            store.dispatch(addPagination(paginationId));
            store.dispatch(changePage(paginationId, 4));

            secondPerPage.find('a').simulate('click');
            expect(_.findWhere(store.getState().paginationComposite, {id: paginationId}).pageNb).toBe(expectedPage);

            firstPerPage.find('a').simulate('click');
            expect(_.findWhere(store.getState().paginationComposite, {id: paginationId}).pageNb).toBe(startingPage);
        });
});
