var input = {
    "id": "SE1",
    "data": 10,
    "left": {
        "id": "SE2",
        "data": 12,
        "left": {
            "id": "SE4",
            "data": 4,
            "right": {
                "id": "SE8",
                "data": 9,
                "left": {
                    "id": "SE15",
                    "data": 20
                }
            }
        },
        "right": {
            "id": "SE5",
            "data": 17,
            "left": {
                "id": "SE9",
                "data": 10,
                "left": {
                    "id": "SE16",
                    "data": 8,
                    "right": {
                        "id": "SE17",
                        "data": 18
                    }
                },
                "right": {
                    "id": "SE10",
                    "data": 11
                }
            }
        }
    },
    "right": {
        "id": "SE3",
        "data": 7,
        "left": {
            "id": "SE6",
            "data": 6,
            "left": {
                "id": "SE11",
                "data": 18
            },
            "right": {
                "id": "SE12",
                "data": 2
            }
        },
        "right": {
            "id": "SE7",
            "data": 3,
            "left": {
                "id": "SE13",
                "data": 13
            },
            "right": {
                "id": "SE14",
                "data": 15
            }
        }
    }
};

var lineWithHighestSales = function (data, bonus) {
    var line = [];

    var dfs = function (node) {
        if (!node) return { totalSales: 0, path: [] };

        var leftResult = dfs(node.left);
        var rightResult = dfs(node.right);

        var bestSubPath = leftResult.totalSales > rightResult.totalSales ? leftResult : rightResult;
        var currentTotalSales = node.data + bestSubPath.totalSales;
        var currentPath = [node].concat(bestSubPath.path);

        return { totalSales: currentTotalSales, path: currentPath };
    };

    var result = dfs(data);
    var highestSalesPath = result.path;

    var totalSubordinates = highestSalesPath.reduce((acc, exec) => {
        return acc + (exec.left ? 1 : 0) + (exec.right ? 1 : 0);
    }, 0);

    var totalSales = result.totalSales;

    var budgetEfficiencyBonus = 0.25 * bonus;
    var salesEfficiencyBonus = 0.75 * bonus;

    highestSalesPath.forEach(exec => {
        var numSubordinates = (exec.left ? 1 : 0) + (exec.right ? 1 : 0);
        var subordinateBonus = (numSubordinates / totalSubordinates) * budgetEfficiencyBonus;
        var salesBonus = (exec.data / totalSales) * salesEfficiencyBonus;
        exec.bonus = subordinateBonus + salesBonus;
        line.push({ id: exec.id, bonus: exec.bonus });
    });

    return line;
};

var bonus = 3000000;

var line = lineWithHighestSales(input, bonus);

console.log("Result:" + JSON.stringify(line));

var expectedLine = [
    { "id": "SE1", "bonus": 550000 },
    { "id": "SE2", "bonus": 560000 },
    { "id": "SE5", "bonus": 660000 },
    { "id": "SE9", "bonus": 400000 },
    { "id": "SE16", "bonus": 290000 },
    { "id": "SE17", "bonus": 540000 }
];

console.log("Expected Result:" + JSON.stringify(expectedLine));