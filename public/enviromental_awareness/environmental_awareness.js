  // DATA FROM: https://data.giss.nasa.gov/gistemp/

      // Fetching CSV Data
      async function getData() {
        const xs = [];
        const ys = [];

        const response = await fetch("ZonAnn.Ts+dSST.csv");
        const data = await response.text();

        const table = data.split("\n").slice(1);

        for (let i = 0; i < table.length; i++) {
          const row = table[i].split(",");

          const year = row[0];
          xs.push(year);
          const temp = row[1];
          ys.push(parseFloat(temp) + 14);
        }

        return { xs, ys };
      }

      async function chartIt() {
        const data = await getData();
        const ctx = document.getElementById("chart").getContext("2d");

        const myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.xs,
            datasets: [
              {
                label: "Combined Land-surface, Air and Sea-Surface Water Temperature in celsius",
                data: data.ys,
                fill: true,
                backgroundColor: ["rgba(210, 10, 10, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: false,
              },
            },
          },
        });
      }

      chartIt();