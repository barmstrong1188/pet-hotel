import { i18n } from 'i18n';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import petSelectors from 'modules/pet/petSelectors';
import destroyActions from 'modules/pet/destroy/petDestroyActions';
import destroySelectors from 'modules/pet/destroy/petDestroySelectors';
import actions from 'modules/pet/list/petListActions';
import selectors from 'modules/pet/list/petListSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonIcon from 'view/shared/ButtonIcon';
import Toolbar from 'view/shared/styles/Toolbar';
import ReactTooltip from 'react-tooltip';
import ConfirmModal from 'view/shared/modals/ConfirmModal';

class PetToolbar extends Component {
  state = {
    destroyAllConfirmVisible: false,
  };

  doOpenDestroyAllConfirmModal = () => {
    this.setState({
      destroyAllConfirmVisible: true,
    });
  };

  doCloseDestroyAllConfirmModal = () => {
    this.setState({ destroyAllConfirmVisible: false });
  };

  doExport = () => {
    const { dispatch } = this.props;
    dispatch(actions.doExport());
  };

  doDestroyAllSelected = () => {
    this.doCloseDestroyAllConfirmModal();
    const { dispatch } = this.props;
    dispatch(
      destroyActions.doDestroyAll(this.props.selectedKeys),
    );
  };

  renderExportButton() {
    const { hasRows, loading, exportLoading } = this.props;

    const disabled = !hasRows || loading;

    const button = (
      <button
        className="btn btn-light"
        disabled={disabled}
        onClick={this.doExport}
        type="button"
      >
        <ButtonIcon
          loading={exportLoading}
          iconClass="far fa-file-excel"
        />{' '}
        {i18n('common.export')}
      </button>
    );

    if (disabled) {
      return (
        <span
          data-tip={i18n('common.noDataToExport')}
          data-tip-disable={!disabled}
          data-for="pet-list-toolbar-export-tooltip"
        >
          {button}
          <ReactTooltip id="pet-list-toolbar-export-tooltip" />
        </span>
      );
    }

    return button;
  }

  renderDestroyButton() {
    const {
      selectedKeys,
      destroyLoading,
      loading,
      hasPermissionToDestroy,
    } = this.props;

    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <button
        disabled={disabled}
        className="btn btn-primary"
        type="button"
        onClick={this.doOpenDestroyAllConfirmModal}
      >
        <ButtonIcon
          loading={destroyLoading}
          iconClass="far fa-trash-alt"
        />{' '}
        {i18n('common.destroy')}
      </button>
    );

    if (disabled) {
      return (
        <span
          data-tip={i18n('common.mustSelectARow')}
          data-tip-disable={!disabled}
          data-for="pet-list-toolbar-destroy-tooltip"
        >
          {button}
          <ReactTooltip id="pet-list-toolbar-destroy-tooltip" />
        </span>
      );
    }

    return button;
  }

  render() {
    return (
      <Toolbar>
        {this.props.hasPermissionToCreate && (
          <Link to="/pet/new">
            <button
              className="btn btn-primary"
              type="button"
            >
              <ButtonIcon iconClass="fas fa-plus" />{' '}
              {i18n('common.new')}
            </button>
          </Link>
        )}

        {this.props.hasPermissionToImport && (
          <Link to="/pet/importer">
            <button
              className="btn btn-primary"
              type="button"
            >
              <ButtonIcon iconClass="fas fa-upload" />{' '}
              {i18n('common.import')}
            </button>
          </Link>
        )}

        {this.renderDestroyButton()}

        {this.props.hasPermissionToAuditLogs && (
          <Link to="/audit-logs?entityNames=pet">
            <button className="btn btn-light" type="button">
              <ButtonIcon iconClass="fas fa-history" />{' '}
              {i18n('auditLog.menu')}
            </button>
          </Link>
        )}

        {this.renderExportButton()}

        {this.state.destroyAllConfirmVisible && (
          <ConfirmModal
            title={i18n('common.areYouSure')}
            onConfirm={() => this.doDestroyAllSelected()}
            onClose={() =>
              this.doCloseDestroyAllConfirmModal()
            }
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    selectedKeys: selectors.selectSelectedKeys(state),
    loading: selectors.selectLoading(state),
    destroyLoading: destroySelectors.selectLoading(state),
    exportLoading: selectors.selectExportLoading(state),
    hasRows: selectors.selectHasRows(state),
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
    hasPermissionToEdit: petSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: petSelectors.selectPermissionToDestroy(
      state,
    ),
    hasPermissionToCreate: petSelectors.selectPermissionToCreate(
      state,
    ),
    hasPermissionToImport: petSelectors.selectPermissionToImport(
      state,
    ),
  };
}

export default connect(select)(PetToolbar);
