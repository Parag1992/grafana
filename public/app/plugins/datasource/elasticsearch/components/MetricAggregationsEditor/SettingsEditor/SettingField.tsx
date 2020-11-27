import React, { ComponentProps } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { useDispatch } from '../../../hooks/useStatelessReducer';
import { changeMetricSetting } from '../state/actions';
import { ChangeMetricSettingAction } from '../state/types';
import { SettingKeyOf } from '../../types';
import { MetricAggregationWithSettings } from '../aggregations';

interface Props<T extends MetricAggregationWithSettings, K extends SettingKeyOf<T>> {
  label: string;
  settingName: K;
  metric: T;
  placeholder?: ComponentProps<typeof Input>['placeholder'];
  tooltip?: ComponentProps<typeof InlineField>['tooltip'];
}

export function SettingField<T extends MetricAggregationWithSettings, K extends SettingKeyOf<T>>({
  label,
  settingName,
  metric,
  placeholder,
  tooltip,
}: Props<T, K>) {
  const dispatch = useDispatch<ChangeMetricSettingAction<T>>();
  const settings = metric.settings;

  return (
    <InlineField label={label} labelWidth={16} tooltip={tooltip}>
      <Input
        placeholder={placeholder}
        onBlur={e => dispatch(changeMetricSetting(metric, settingName, e.target.value as any))}
        defaultValue={settings?.[settingName as keyof typeof settings]}
      />
    </InlineField>
  );
}
