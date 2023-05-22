function ModalDetail() {
    return(
        <div>
            <dl>
                <dt>과목명</dt>
                <dd>
                    <input type={"text"} placeholder="강의명"></input>
                </dd>
                <dt>시간/장소</dt>
                <dd>
                    <div>
                        <ol className="weeks">
                            <li className="day">월</li>
                            <li className="day">화</li>
                            <li className="day">수</li>
                            <li className="day">목</li>
                            <li className="day">금</li>
                            <li className="day">토</li>
                            <li className="day">일</li>
                        </ol>
                    </div>
                </dd>
            </dl>
        </div>
    )
}

export default ModalDetail;