const fs = require('fs');
const { addUser } = require('./addUser');

jest.mock('fs');

describe('addUser function', () => {
  let request;
  let response;
  let mockDatabaseContent;

  beforeEach(() => {
    request = {
      on: jest.fn(),
    };
    response = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };
    mockDatabaseContent =
      '[{"id":1,"username":"CheckMe","age":99,"hobbies":["nodejs","sleep"]}]';

    fs.readFile = jest.fn().mockImplementation((callback) => {
      callback(null, mockDatabaseContent);
    });

    fs.writeFile = jest.fn().mockImplementation((data, callback) => {
      mockDatabaseContent = data;
      callback(null);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with error message when any of the required fields is missing', () => {
    const incompleteUserData = '{"username": "Mamont", "age": 36}';

    request.on.mockImplementation((event, callback) => {
      if (event === 'data') {
        callback(incompleteUserData);
      } else if (event === 'end') {
        callback();
      }
    });

    addUser(request, response);

    expect(fs.writeFile).not.toHaveBeenCalled();
    expect(response.writeHead).toHaveBeenCalledWith(400, {
      'Content-Type': 'application/json',
    });
    expect(response.end).toHaveBeenCalledWith(expect.any(String));
  });
});
