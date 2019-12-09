import TodoList from './todo_list';
import {connect} from 'react-redux';

import {receiveTodos, receiveTodo, fetchTodos, createTodo, removeTodo} from '../../actions/todo_actions';
import {allTodos} from '../../reducers/selectors';

const mapStateToProps = state => ({
    todos: allTodos(state),
    state,
    errors: state.errors
});

const mapDispatchToProps = dispatch => ({
    receiveTodo: todo => dispatch(receiveTodo(todo)),
    receiveTodos: todo => dispatch(receiveTodos(todo)),
    fetchTodos: todo => dispatch(fetchTodos(todo)),
    createTodo: todo => dispatch(createTodo(todo)),
    removeTodo: todo => dispatch(removeTodo(todo))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);