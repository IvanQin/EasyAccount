/**
 * Created by Qinyifan on 18/3/11.
 */

export function accoutSolver(records, people, peopleToId) {
    this.records = records;
    this.people = people; // all of the people
    this.numberOfPeople = people.length;
    this.matrix = new Array(this.numberOfPeople); // matrix[i][j] means i should pay j money of amount matrix[i][j]
    this.peopleToId = peopleToId;
    this.initRawMatrix = function () {
        for (let i = 0; i < this.numberOfPeople; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < this.numberOfPeople; j++) {
                this.matrix[i][j] = 0.0;
            }
        }
    };

    this.addAllRecord = function () {
        for (let i in this.records) {
            if (this.records.hasOwnProperty(i)) {
                let record = this.records[i];
                let involvedPeople = record.involvedPeople;
                let avgAmount = record.avgAmount;
                let payerId = this.peopleToId[record.author];
                for (let k in involvedPeople) {
                    if (involvedPeople.hasOwnProperty(k)) {
                        let payeeId = this.peopleToId[involvedPeople[k]];
                        if (payeeId != payerId)
                            this.matrix[payeeId][payerId] += avgAmount;
                    }
                }
            }
        }
    };
    this.regularize = function () {
        for (let i = 0; i < this.numberOfPeople; i++) {
            for (let j = i + 1; j < this.numberOfPeople; j++) {
                let tmp = this.matrix[i][j] - this.matrix[j][i];
                this.matrix[i][j] = tmp;
                this.matrix[j][i] = -tmp;
            }
        }
    };
    this.runSolver = function () {
        this.initRawMatrix();
        this.addAllRecord();
        this.regularize();
        return this.matrix;
    };

}