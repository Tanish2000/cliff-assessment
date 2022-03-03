import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const Chart = ({ chartData }) => {
    const options = {
        responsive: true,
        spanGaps: false,
        elements: {
            line: {
                tension: 0.000001
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: chartData.measure,
            },
            filler: {
                propagate: false
            }
        },
        scales: {
            y: {
                stacked: false
            }
        },
    };

    const borderData = chartData.line_status.map((entry) => {
        return (entry === 0 || entry === 3) ? '#5072A7' : '#ff0000'
    })

    const generateData = (chartData) => {
        return {
            labels: chartData.time_stamp,
            datasets: [
                {
                    label: "Min. band",
                    data: chartData.min_band,
                    backgroundColor: 'rgba(200, 200, 236,0.7)',
                    borderColor: 'rgba(185, 189, 236,0.4)',
                    tension: 0.3,
                    fill: '1',
                    pointRadius: 1,
                    order: 2
                },
                {
                    label: "Max. band",
                    data: chartData.max_band,
                    backgroundColor: 'rgba(185, 189, 236,0.7)',
                    borderColor: 'rgba(185, 189, 236,0.4)',
                    tension: 0.3,
                    fill: '1',
                    pointRadius: 1,
                    order: 2
                },
                {
                    label: "Original Value",
                    data: chartData.original_value,
                    backgroundColor: '#5072A7',
                    borderColor: borderData,
                    borderWidth: 1.5,
                    pointRadius: 0,
                    order: 1,
                },
                {
                    label: "Forecasted Value",
                    data: chartData.forcasted_value,
                    backgroundColor: 'rgb(79, 121, 66)',
                    borderColor: 'rgb(79, 121, 66)',
                    borderWidth: 1.5,
                    pointRadius: 0,
                    borderDash: [5,3]
                },
            ]
        }
    }

    return <Line options={options} data={generateData(chartData)} />;
}

export default Chart;
