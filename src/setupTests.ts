// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { fixture } from './fixture';

const server = setupServer(
  rest.get('/api/v1/meals', (req, res, ctx) => {
    return res(ctx.json({ data: fixture.meals, totalCount: fixture.meals.length }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
