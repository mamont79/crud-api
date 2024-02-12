const fs = require('fs');
const { getUser } = require('./getUsers');

jest.mock('fs');

describe('getUser function', () => {
  let request;
  let response;

  beforeEach(() => {
    request = {};
    response = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with file content when readFile succeeds', () => {
    const userData = { id: 1, username: 'Nodik', age: 15, hobbies: [] };
    const readFileMock = jest.spyOn(fs, 'readFile');
    readFileMock.mockImplementationOnce((path, options, callback) => {
      callback(null, JSON.stringify(userData));
    });

    getUser(request, response);

    expect(response.writeHead).toHaveBeenCalledWith(200, {
      'Content-Type': 'application/json',
    });
    expect(response.end).toHaveBeenCalledWith(
      JSON.stringify({
        success: true,
        message: userData,
      })
    );
  });

  it('should respond with error message when readFile fails', () => {
    const error = new Error('File read error');
    const readFileMock = jest.spyOn(fs, 'readFile');
    readFileMock.mockImplementationOnce((path, options, callback) => {
      callback(error);
    });

    getUser(request, response);

    expect(response.writeHead).toHaveBeenCalledWith(500, {
      'Content-Type': 'application/json',
    });
    expect(response.end).toHaveBeenCalledWith(
      JSON.stringify({
        success: false,
        error: 'Something wrong on server',
      })
    );
  });
});
