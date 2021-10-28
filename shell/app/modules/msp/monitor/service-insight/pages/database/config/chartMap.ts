// Copyright (c) 2021 Terminus, Inc.
//
// This program is free software: you can use, redistribute, and/or modify
// it under the terms of the GNU Affero General Public License, version 3
// or later ("AGPL"), as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import { merge } from 'lodash';
import { dbSlowTrackPanel } from 'service-insight/common/components/slow-track-panel';
import { dbErrorTrackPanel } from 'service-insight/common/components/error-track-panel';
import { sortRender, chartRender } from 'service-insight/common/components/siRenderFactory';
import { ApiMap } from './apiConfig';
import i18n from 'i18n';

export const commonAttr = {
  moduleName: 'SIDataBase',
  groupId: 'SIDataBase',
};
const chartMap = merge(
  {
    sortTab: {
      ...commonAttr,
      type: 'sortTab',
      tabList: [
        { name: i18n.t('msp:throughput'), key: 'throughput' },
        { name: i18n.t('msp:average time'), key: 'rt' },
      ],
    },
    sortList: {
      type: 'sortList',
      ...commonAttr,
      chartName: 'overviewSort',
    },
    responseTimes: {
      titleText: `${i18n.t('response time')} TOP5`,
      ...commonAttr,
      chartName: 'responseTimes',
      viewProps: {
        unitType: 'TIME',
      },
    },
    throughput: {
      titleText: `${i18n.t('msp:throughput')} TOP5`,
      ...commonAttr,
      chartName: 'throughput',
      viewProps: {
        unitType: 'CPM',
      },
    },
    slowTrack: {
      titleText: `${i18n.t('msp:slow database tracking')} TOP10`,
      ...commonAttr,
      chartName: 'slowTrack',
      viewRender: dbSlowTrackPanel,
    },
    errorTrack: {
      titleText: `${i18n.t('msp:error database tracking')} TOP10`,
      ...commonAttr,
      chartName: 'errorTrack',
      viewRender: dbErrorTrackPanel,
    },
  },
  ApiMap,
);

export default {
  sortTab: sortRender(chartMap.sortTab) as any,
  sortList: sortRender(chartMap.sortList) as any,
  responseTimes: chartRender(chartMap.responseTimes) as any,
  throughput: chartRender(chartMap.throughput) as any,
  slowTrack: chartRender(chartMap.slowTrack) as any,
  errorTrack: chartRender(chartMap.errorTrack) as any,
};
