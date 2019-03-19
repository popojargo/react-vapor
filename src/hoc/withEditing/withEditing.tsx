import * as React from 'react';
import * as _ from 'underscore';
import {StickyFooter} from '../../components/stickyFooter/StickyFooter';
import {IReactVaporState} from '../../ReactVapor';
import {IDispatch, ReduxConnect} from '../../utils/ReduxUtils';
import {toggleDirtyComponent} from './withEditingActions';
import {getIsDirty} from './withEditingReducers';

export interface IWithEditing {
    id: string;
    isDirty?: boolean;
    footerClassName?: string;
    footerChildren?: React.ReactNode;
}

export interface IWithEditStateProps {
    isDirty: boolean;
}

export interface IWithEditDispatchProps {
    toggleDirtyComponent: (isDirty: boolean) => void;
}

export interface IWithEditingProps extends IWithEditStateProps, IWithEditDispatchProps {}

export const withEditing = <T, R = any>(config: IWithEditing) =>
    (Component: React.ComponentClass): React.ComponentClass<Partial<IWithEditingProps> & T, R> => {
        const mapStateToProps = (state: IReactVaporState): IWithEditStateProps => ({
            isDirty: getIsDirty(state, config.id),
        });

        const mapDispatchToProps = (dispatch: IDispatch): IWithEditDispatchProps => ({
            toggleDirtyComponent: (isDirty: boolean) => dispatch(toggleDirtyComponent(config.id, isDirty)),
        });

        @ReduxConnect(mapStateToProps, mapDispatchToProps)
        class ComponentWithEditing extends React.Component<Partial<IWithEditingProps> & T, R> {
            componentDidMount() {
                this.props.toggleDirtyComponent(config.isDirty);
            }

            componentWillUnmount() {
                this.props.toggleDirtyComponent(false);
            }

            render() {
                return (
                    <div>
                        <Component {...this.props}>
                            {this.props.children}
                        </Component>
                        {config.footerChildren && (
                            <StickyFooter className={config.footerClassName} isOpened={this.props.isDirty}>
                                {config.footerChildren}
                            </StickyFooter>
                        )}
                    </div>
                );
            }
        }

        return ComponentWithEditing;
    };
