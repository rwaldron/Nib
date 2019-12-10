import PropTypes from "prop-types";
import React, { Fragment, PureComponent } from "react";
import { ToolbarButton, Icon, Space } from "nib-ui";

import { PMStateConsumer } from "../../context/pm-state";
import { colorPluginKey } from "./plugin";
import { ConfigContextConsumer } from "../../context/config";

class ToolbarComponent extends PureComponent {
  getActiveColorMarks = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state } = pmview;
    const pluginState = colorPluginKey.getState(state);
    return pluginState && pluginState.activeMarks;
  };

  toggleMarkofType = evt => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const markName = evt.currentTarget.getAttribute("name");
    const { state, dispatch } = pmview;
    const { schema, selection, tr } = state;
    const { $from, $to } = selection;
    const markType = schema.marks[markName];
    const colorMark = markType.create({
      color: "red"
    });
    tr.addMark($from.pos, $to.pos, colorMark).setStoredMarks([colorMark]);
    dispatch(tr);
  };

  render() {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return null;

    return (
      <Fragment>
        <ToolbarButton
          name="textColor"
          onClick={this.toggleMarkofType}
          selected={false}
        >
          <Icon name="bold" selected={false} />
        </ToolbarButton>
        <Space />
        <ToolbarButton
          name="backgroundColor"
          onClick={this.toggleMarkofType}
          selected={false}
        >
          <Icon name="italic" selected={false} />
        </ToolbarButton>
      </Fragment>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired
};

export default props => (
  <ConfigContextConsumer>
    {({ config }) => (
      <PMStateConsumer>
        {pmstate => (
          <ToolbarComponent pmstate={pmstate} config={config} {...props} />
        )}
      </PMStateConsumer>
    )}
  </ConfigContextConsumer>
);
