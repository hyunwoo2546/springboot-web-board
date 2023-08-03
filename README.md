# 커뮤니티 프로젝트
<br>

### 🕰️ 개발 기간
- **2023.07.07 ~ ####.##.##**

<br>

### 🧑‍🤝‍🧑 멤버 현황
- **강현우**
  
<br>

### ⚙️ 개발 환경
- **Java** : 11
- **IDE** : IntelliJ
- **Framework** : Springboot(2.7.12)
- **Database** : MariaDB
- **Front** : thymeleaf
- **ORM** : JPA(Hibernate)
- **WAS** : 내장
- **Server** : AWS 사용 예정
- **Test Tool** : Swagger UI

<br>

### 📌 노트
```
# JPA에서의 인덱스 태우기
@Table(name = "Reply", indexes = {
        @Index(name = "idx_reply_board_bno", columnList = "board_bno")
})
```

<br>

```
# orElseThrow()
ex)
    @Override
    public ReplyDTO read(Long rno) {

        Optional<Reply> replyOptional = replyRepository.findById(rno);

        // orElseThrow() : 해당되는 값이 없다면 예외 있다면 return
        Reply reply = replyOptional.orElseThrow();

        return modelMapper.map(reply, ReplyDTO.class);
    }
```
