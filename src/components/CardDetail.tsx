import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import * as CustomService from "../CustomService";
import { Typography, Row, Col  } from 'antd';
import CommentForm from './CommentForms';
import NotFoundComponent from './NotFoundComponent';

const { Paragraph, Title } = Typography;

function CardDetail() {
    const { id }: { id: string | undefined } = useParams();
    const [cardDetail, setCardDetail] = useState<any>();

    useEffect(() => {
        CustomService.getSpecificTicker(id)
            .then((data: any) => {
                setCardDetail(data);
            }).catch(err => {
                setCardDetail(undefined);
            })
    }, [id])

    return (
        <>
            {cardDetail === undefined || cardDetail === "" ?
                <NotFoundComponent /> : 
                <>
                    <Row>
                        <Col offset={2} span={20}>                    
                            <Title>{cardDetail.data[0].name}</Title>
                            <Paragraph>Type: {cardDetail.data[0].type}</Paragraph>
                            <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>Effect: {cardDetail.data[0].desc}</Paragraph>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <CommentForm />
                        </Col>
                    </Row>
                </>
            }
        </>
    )
}



export default CardDetail
