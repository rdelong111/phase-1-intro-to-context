function createEmployeeRecord(info) {
	const record = {
		'firstName': info[0],
		'familyName': info[1],
		'title': info[2],
		'payPerHour': info[3],
		'timeInEvents': [],
		'timeOutEvents': []
	};

	return record;
}

function createEmployeeRecords(records) {
	let list = [];
	for (let record of records) {
		list.push(createEmployeeRecord(record));
	}
	return list;
}

function createTimeInEvent(record, time) {
	const timeA = time.split(' ');
	const timeOb = {
		'type': 'TimeIn',
		'hour': parseInt(timeA[1]),
		'date': timeA[0]
	};
	record.timeInEvents.push(timeOb);
	return record;
}

function createTimeOutEvent(record, time) {
	const timeA = time.split(' ');
	const timeOb = {
		'type': 'TimeOut',
		'hour': parseInt(timeA[1]),
		'date': timeA[0]
	};
	record.timeOutEvents.push(timeOb);
	return record;
}

function hoursWorkedOnDate(record, dateI) {
	const timeI = record.timeInEvents;
	const timeO = record.timeOutEvents;
	for (let i = 0; i < timeI.length; i++) {
		if (timeI[i].date === dateI) {
			return (timeO[i].hour - timeI[i].hour) / 100;
		}
	}
}

function wagesEarnedOnDate(record, dateI) {
	return record.payPerHour * hoursWorkedOnDate(record, dateI);
}

function allWagesFor(record) {
	const timeI = record.timeInEvents;

	let pay = 0;

	for (let i = 0; i < timeI.length; i++) {
		pay += wagesEarnedOnDate(record, timeI[i].date);
	}
	return pay;
}

function calculatePayroll(records) {
	let pay = 0;
	for (let record of records) {
		pay += allWagesFor(record);
	}
	return pay;
}