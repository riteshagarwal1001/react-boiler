import * as React from 'react';
import { ReactElement, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { BarChart, Bar, XAxis, YAxis, Label, CartesianGrid } from 'Recharts';

export interface HorizontalChartProp {
    data: { key: string; value: number }[];
    width: number;
    height: number;
    range: number;
    title?: string;
    xLabel?: any;
    yLabel?: any;
}

function HorizontalChart(props: HorizontalChartProp): ReactElement {
    const { data, height, title, xLabel, yLabel } = props;
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
            .attr('id', 'bar-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('x2', '100%')
            .selectAll('stop')
            .data([
                { offset: '30%', color: '#B2E7FA' },
                { offset: '90%', color: '#22B9F0' },
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
            .attr('id', 'bar-gradient2')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('x2', '100%')
            .selectAll('stop')
            .data([
                { offset: '0%', color: '#FEF3BC' },
                { offset: '90%', color: '#F8D200' },
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

    const numFormatter = num => {
        if (num === 0) {
            return num / 1000000;
        } else {
            return num / 1000000 + ' Mn';
        }
    };

    // const dateFormatter = date => {
    //     let options = { year: '2-digit', month: 'short' };
    //     let d = new Date(date).toLocaleDateString([], options);
    //     if (d == 'Invalid Date') {
    //         return date;
    //     } else {
    //         return d;
    //     }
    // };

    const CustomizedLabel = labelProps => {
        const { x, y, width, height: labelHeight, value, index } = labelProps;

        return (
            <>
                <text
                    x={width + x + 20}
                    y={y + labelHeight / 2.2}
                    fontSize="13"
                    fontFamily="sans-serif"
                    fill="#11365A"
                    textAnchor="start"
                    className="label"
                >
                    {arr[index].name}
                </text>
                <text
                    x={width + x + 20}
                    y={y + 15 + labelHeight / 2.2}
                    fontSize="11"
                    fontFamily="sans-serif"
                    fill="#11365A"
                    textAnchor="start"
                    className="value"
                >
                    {numFormatter(value)}
                </text>
            </>
        );
    };

    const CustomizedTickX = tickYProps => {
        const { width, height: tickHeight, x, y, payload } = tickYProps;
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
                {numFormatter(payload.value)}
            </text>
        );
    };

    // const CustomizedTickY = tickXProps => {
    //     const { width, height: tickHeight, x, y, payload } = tickXProps;
    //     return (
    //         <text
    //             width={width}
    //             height={tickHeight}
    //             x={x}
    //             y={y - 8}
    //             stroke="none"
    //             fontSize="14"
    //             fill="rgba(74,54, 90, 0.6)"
    //             className="recharts-text recharts-cartesian-axis-tick-value"
    //             textAnchor="end"
    //         >
    //             {typeof payload.value != 'number' &&
    //                 dateFormatter(payload.value)}
    //             {typeof payload.value == 'number' && payload.value}
    //         </text>
    //     );
    // };

    const ChartLoadfuncton = t => {
        const chartWidth = t;
        const chartHeight = t > 250 ? 250 : t;
        setChartLoad(() => {
            return (
                <BarChart
                    width={chartWidth}
                    height={chartHeight}
                    data={arr}
                    layout="vertical"
                    margin={{ top: 5, right: 70, left: 0, bottom: 5 }}
                    barCategoryGap="2"
                >
                    <XAxis
                        type="number"
                        dataKey="value"
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
                        type="category"
                        dataKey="name"
                        tick={false}
                        tickLine={false}
                    >
                        {yLabel && (
                            <Label
                                value={yLabel}
                                angle={-90}
                                position="insideLeft"
                                offset={20}
                                className="yLabel f-12"
                            />
                        )}
                    </YAxis>
                    <Bar
                        dataKey="value"
                        fill="#8884d8"
                        barSize={25}
                        label={{ content: <CustomizedLabel /> }}
                    ></Bar>

                    <CartesianGrid horizontal={false} />
                </BarChart>
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
            id="bar-chart"
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
            <div id="row-chart-wrap" className="w-100" ref={targetRef}>
                {ChartLoad}
            </div>
        </div>
    );
}
export default HorizontalChart;
