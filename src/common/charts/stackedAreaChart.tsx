import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
} from 'Recharts';

export interface AreaChartChartProp {
    data: { key: number | string; value: number }[];
    width: number;
    height: number;
    range: number;
    xAxisIsDate?: boolean;
    title?: any;
    xLabel?: any;
    yLabel?: any;
}

const numFormatter = num => {
    if (num === 0) {
        return '$' + num / 1000000;
    } else {
        return '$' + num / 1000000 + ' Mn';
    }
};

const dateFormatter = date => {
    let options = { year: '2-digit', month: 'short' };
    let d = new Date(date).toLocaleDateString([], options);
    return d;
};

function StackedBarChart(props: AreaChartChartProp) {
    const { data, height, title, xLabel, yLabel, xAxisIsDate } = props;
    const [ChartLoad, setChartLoad] = useState(<div></div>);
    const targetRef = useRef(null);

    const drawChart = (w: any) => {
        let margin = { top: 10, right: 10, bottom: 10, left: 70 };
        const gwidth = w;
        let svg = d3
            .select('body')
            .append('svg')
            .attr('width', gwidth)
            .attr('height', height + margin.top + margin.bottom + 15);

        svg.append('linearGradient')
            .attr('id', 'area-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x2', 0)
            .attr('y2', '100%')
            .selectAll('stop')
            .data([
                { offset: '0%', color: 'rgba(84, 216, 255, 0.6)' },
                { offset: '90%', color: 'white' },
            ])
            .enter()
            .append('stop')
            .attr('offset', function(d) {
                return d.offset;
            })
            .attr('stop-color', function(d) {
                return d.color;
            });

        svg.append('linearGradient')
            .attr('id', 'area-gradient2')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x2', 0)
            .attr('y2', '100%')
            .selectAll('stop')
            .data([
                { offset: '0%', color: 'rgba(248, 210, 0, 0.6)' },
                { offset: '90%', color: 'white' },
            ])
            .enter()
            .append('stop')
            .attr('offset', function(d) {
                return d.offset;
            })
            .attr('stop-color', function(d) {
                return d.color;
            });
    };

    const arr = [];
    Object.keys(data).forEach(key => {
        arr.push({ name: data[key].key, value: data[key].value });
    });

    const CustomTooltip = tooltipProps => {
        const { active } = tooltipProps;
        let tooltipOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        if (active) {
            const { payload } = tooltipProps;
            let td = xAxisIsDate
                ? new Date(
                      tooltipProps.payload[0].payload.name,
                  ).toLocaleDateString([], tooltipOptions)
                : tooltipProps.payload[0].payload.name;
            return (
                <div className="custom-tooltip p-3 position-relative text-left">
                    <div className="time">{td}</div>
                    <div className="value">
                        {numFormatter(payload[0].payload.value)}
                    </div>
                </div>
            );
        }
        return null;
    };

    const CustomizedTickY = tickYProps => {
        const { width, height: tickHeight, x, y, payload } = tickYProps;
        return (
            <text
                width={width}
                height={tickHeight}
                x={x}
                y={y - 8}
                stroke="none"
                fontSize="14"
                fill="rgba(74,54, 90, 0.6)"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="end"
            >
                {numFormatter(payload.value)}
            </text>
        );
    };

    const CustomizedTickX = tickXProps => {
        const { width, height: tickHeight, x, y, payload } = tickXProps;
        return (
            <text
                width={width}
                height={tickHeight}
                x={x + 10}
                y={y + 15}
                stroke="none"
                fontSize="14"
                fill="rgba(74,54, 90, 0.6)"
                className="recharts-text recharts-cartesian-axis-tick-value"
                textAnchor="end"
            >
                {typeof payload.value != 'number' &&
                    dateFormatter(payload.value)}
                {typeof payload.value == 'number' && payload.value}
            </text>
        );
    };

    const ChartLoadfuncton = t => {
        const chartWidth = yLabel
            ? t > 500
                ? 500 - 30
                : t - 30
            : t > 500
            ? 500
            : t;
        const chartHeight = xLabel
            ? t > 250
                ? 250 - 30
                : t - 30
            : t > 250
            ? 250
            : t;
        setChartLoad(() => {
            return (
                <ResponsiveContainer width={chartWidth} height={chartHeight}>
                    <AreaChart
                        width={chartWidth}
                        height={chartHeight}
                        data={arr}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid
                            vertical={false}
                            x={-0}
                            width={chartWidth}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={CustomizedTickX}
                        >
                            {xLabel && (
                                <Label
                                    value={xLabel}
                                    offset={-20}
                                    position="insideBottom"
                                    className="xLabel f-12"
                                />
                            )}
                        </XAxis>
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={CustomizedTickY}
                        >
                            {yLabel && (
                                <Label
                                    value={yLabel}
                                    angle={-90}
                                    position="insideLeft"
                                    offset={-20}
                                    className="yLabel f-12"
                                />
                            )}
                        </YAxis>
                        <Tooltip content={CustomTooltip} />
                        <Area
                            type="natural"
                            dataKey="value"
                            activeDot={{
                                stroke: 'rgb(84, 216, 255)',
                                fill: '#fff',
                                strokeWidth: 2,
                            }}
                            strokeWidth={2}
                            stroke="rgb(84, 216, 255)"
                            fill="url(#area-gradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            );
        });
    };

    useEffect(() => {
        if (targetRef.current !== null) {
            let t = targetRef.current.clientWidth;
            drawChart(t);
            ChartLoadfuncton(t);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetRef]);

    return (
        <div
            id="area-chart"
            className={
                xLabel
                    ? 'd-inline-block p-4 pb-5 w-100 h-100'
                    : 'd-inline-block p-4 w-100 h-100'
            }
        >
            {title && (
                <div className="heading f-16 pb-3 font-weight-bold">
                    {title}
                </div>
            )}
            <div id="area-chart-wrap" className="w-100" ref={targetRef}>
                {ChartLoad}
            </div>
        </div>
    );
}

export default StackedBarChart;
