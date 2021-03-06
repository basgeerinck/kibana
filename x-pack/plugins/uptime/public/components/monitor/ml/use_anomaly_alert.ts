/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExistingAlertAction } from '../../../state/actions/alerts';
import { alertSelector, selectAlertFlyoutVisibility } from '../../../state/selectors';
import { UptimeRefreshContext } from '../../../contexts';
import { useMonitorId } from '../../../hooks';

export const useAnomalyAlert = () => {
  const { lastRefresh } = useContext(UptimeRefreshContext);

  const dispatch = useDispatch();

  const monitorId = useMonitorId();

  const { data: anomalyAlert } = useSelector(alertSelector);

  const alertFlyoutVisible = useSelector(selectAlertFlyoutVisibility);

  useEffect(() => {
    dispatch(getExistingAlertAction.get({ monitorId }));
  }, [monitorId, lastRefresh, dispatch, alertFlyoutVisible]);

  return anomalyAlert;
};
