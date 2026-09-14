/**
 * Creates a chart using Chart.js library.
 * 
 * @param {string} chartId - The ID of the canvas element where the chart will be rendered.
 * @param {Array} dataLabels - The labels for the chart's x-axis.
 * @param {string} labelTitle - The title for the dataset.
 * @param {Array} dataSets - The data to be plotted on the chart.
 * @param {number} dataMin - The minimum value for the y-axis.
 * @param {number} dataMax - The maximum value for the y-axis.
 * @param {number} step - The step size for the y-axis ticks.
 * @throws Will throw an error if the chartId is not found in the document.
 */
export function chartCreator(chartId, dataLabels, labelTitle, dataSets, dataMin, dataMax, step) {
  const ctx = document.getElementById(chartId);
  
  if (!ctx) {
    throw new Error(`Element with id ${chartId} not found`);
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataLabels,
      datasets: [{
        label: labelTitle,
        data: dataSets,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
            enabled: true
        },
        legend: {
          labels: {
              font: {
                  size: 13, // Adjust font size
                  weight: 500
              },
              color: 'black'
          }
        },
        customZero: {
          color: 'black', // Color of the line/text for zero values
          lineWidth: 1 // Line width
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            stepSize: step, // set the step size for finer intervals
            font: {
              size: 12, // Adjust font size
              weight: 400 // Adjust font weight
            },
            color: 'black' // Adjust font color
          },
          min: dataMin,
          max: dataMax
        },
        x: {
          ticks: {
              font: {
                  size: 12, // Adjust font size
                  weight: 400 // Adjust font weight
              },
              color: 'black' // Adjust font color
          }
        }
      }
    },
    plugins: [{
      id: 'customZero', // Custom plugin to draw something for zero values
      afterDraw: (chart) => {
          const ctx = chart.ctx;
          chart.data.datasets.forEach((dataset, i) => {
              const meta = chart.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                  const value = dataset.data[index];
                  if (value === 0) {
                      // Draw a small horizontal line to indicate 0 value
                      ctx.save();
                      ctx.fillStyle = 'rgba(0, 0, 0)'; // Color for zero bar indication
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'bottom';
                      ctx.fillText('0', bar.x, bar.y - 5); // Draw '0' above the bar
                      ctx.restore();
                  }
              });
          });
      }
    }]
  });
}
