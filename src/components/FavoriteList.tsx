import { useEffect, useState } from "react";
import { CardList } from "../interfaces/ListInterface";
import { State } from "../redux/InitialState";
import { List, Card, Space, Typography, Button } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerTypes } from "../redux/CardReducer";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionAsync } from "../redux/CardActions";

const {Paragraph} = Typography;

const FavoriteList = (props: any) => {
    const dispatch = useDispatch();
    const { favorites: appAllCards } = props;

    useEffect(() => {
        dispatch(fetchCollectionAsync());
    }, []);

    return (
        <>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={props.favorites}
                renderItem={(item: CardList) => (
                    <List.Item>
                        <Card title={<Link to={`/list/${item.id}`}>
                            {item.name}
                        </Link>}>
                            <Paragraph>Type:{item.type}</Paragraph>
                            <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} >Effect:{item.desc}</Paragraph>
                            <Space direction="horizontal">
                                {appAllCards.findIndex((card: CardList) => card.id === item.id) === -1 ?
                                    <Button
                                        icon={<StarTwoTone twoToneColor="yellow" />}
                                        onClick={() => props.addFavCard(item)}>
                                    </Button>
                                    :
                                    <Button
                                        icon={<StarTwoTone twoToneColor="red" />}
                                        onClick={() => props.deleteFavCard(item)}>
                                    </Button>
                                }
                            </Space>
                        </Card>
                    </List.Item>
                )}
            /></>
    )
}

const mapStateToProps = (state: any) => {
    return ({ favorites: state.card.favorites, loading: state.card.loading, cards: state.card.cards, comments: state.comment.comments });
}

const mapDispatchToProps = (dispatch: any) => ({
    addFavCard: (card: CardList) => dispatch({ type: ReducerTypes.ADD, payload: card }),
    deleteFavCard: (card: CardList) => dispatch({ type: ReducerTypes.REMOVE, payload: card })
})

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return { ...ownProps, ...stateProps, ...dispatchProps }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FavoriteList);