import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
    PieChart,
    Pie,
    Legend,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from 'Recharts';
export interface DoNutChartProp {
    data: { [key: string]: number };
    title: string;
    id: any;
}

function DonutChart(props: DoNutChartProp) {
    const { data, title, id } = props;
    const [ChartLoad, setChartLoad] = useState(<div></div>);
    const COLORS = [
        '#F2D347',
        '#5CB9C0',
        '#2A5185',
        '#59B6EB',
        '#98FAFD',
        '#D22D50',
    ];
    const percentage = num => {
        let sum = 0;
        Object.keys(data).forEach(d => {
            sum += data[d];
        });
        num = ((num / sum) * 100).toFixed(0);
        return num;
    };
    const numFormatter = num => {
        if (num === 0) {
            return num / 1000000;
        } else {
            return num / 1000000 + ' Mn';
        }
    };
    const arr = [];
    Object.keys(data).forEach(key =>
        arr.push({
            name: key,
            value: parseInt(percentage(data[key])),
            actualValue: data[key],
        }),
    );
    const targetRef = useRef(null);

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x > cx ? x + 15 : x - 15}
                y={y > cy ? y + 15 : y - 15}
                fill="rgba(74,54, 90, 0.6)"
                fontSize="12"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const renderColorfulLegendText = (value, entry) => {
        const { color } = entry;
        return <span style={{ color, fontSize: '11px' }}>{value}</span>;
    };

    const CustomTooltip = tooltipProps => {
        const { active } = tooltipProps;

        if (active) {
            const { payload } = tooltipProps;
            return (
                <div className="custom-tooltip p-3">
                    <div className="label">{` ${payload[0].name} - ${payload[0].value}%`}</div>
                    <div className="value f-14">{`USD ${numFormatter(
                        payload[0].payload.actualValue,
                    )}`}</div>
                </div>
            );
        }

        return null;
    };

    const ChartLoadfuncton = t => {
        const chartWidth = t > 500 ? 500 : t;
        const radius = chartWidth / 2 / 2 + 10;
        const space = 50;
        setChartLoad(() => {
            return (
                <ResponsiveContainer
                    width={chartWidth}
                    height={chartWidth + space}
                >
                    <PieChart width={chartWidth} height={chartWidth + space}>
                        <Pie
                            data={arr}
                            cx={chartWidth / 2}
                            cy={chartWidth / 2}
                            innerRadius={radius}
                            outerRadius={radius + 10}
                            fill="#82ca9d"
                            label={renderCustomizedLabel}
                            dataKey="value"
                        >
                            {arr.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                ></Cell>
                            ))}
                        </Pie>
                        <Legend
                            verticalAlign="bottom"
                            height={space}
                            align="center"
                            iconSize={10}
                            iconType="circle"
                            fontSize="12"
                            formatter={renderColorfulLegendText}
                        />
                        <Tooltip content={CustomTooltip} />
                    </PieChart>
                </ResponsiveContainer>
            );
        });
    };

    useEffect(() => {
        if (targetRef.current !== null) {
            let t = targetRef.current.clientWidth;
            ChartLoadfuncton(t);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetRef]);

    return (
        <div id="donut_chart" className="d-inline-block p-4 w-100 h-100">
            {title && (
                <div className="heading f-16 pb-3 font-weight-bold">
                    {title}
                </div>
            )}
            <div id={id} className="donut-chart-wrap w-100" ref={targetRef}>
                {ChartLoad}
            </div>
        </div>
    );
}

export default DonutChart;
