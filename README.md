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

<br>

```
# 다대일 연관 관계의 구현
ex)

@Entity
@Table(name = "Reply", indexes = {
    @Index(name = "idx_reply_board_bno", columnList = "board_bno")
})
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "board")
public class Reply extends BaseEntity{

    // # 프로젝트 실행시 Reply 테이블 생성과 동시에 기본키 설정
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rno;

    // # Board 테이블을 참조하며 Board 테이블에 기본키를 Reply 테이블에서 외래키로 잡음
    // # JPA 처음 접해보는 거라 생소하긴 한데 기존 방식으로 생각해본다면 타 테이블을 참조해서 사용하는 것으로 보아 JOIN과 비슷한것 같음
    @ManyToOne(fetch = FetchType.LAZY)
    private Board board;

    private String replyText;

    private String replyer;

    public void changeText(String text){
        this.replyText = text;
    }

}
```

<br>

```
# 댓글 등록시 Board 테이블에 BNO 칼럼 참조 오류 해결
ex)
@Configuration
public class RootConfig {

    @Bean
    public ModelMapper getMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
                .setMatchingStrategy(MatchingStrategies.LOOSE); // # 매칭전략을 느슨함으로 설정 변경

        return modelMapper;
    }

}
```

<br>

```
# Axios
- Axios란 비동기 호출을 동기화된 방식으로 작성 할 수 있는 문법적인 라이브러리
- Axios를 이용하면 Ajax를 호출하는 코드를 작성 할 때 마치 동기화된 방식처럼 작성 할 수 있다.

[참고 문헌 : 구멍가게 코딩단.2022.자바 웹 개발 워크북.프리렉]
```

<br>

```
# MultiPartFile
- 서블릿 3이상이 되면서 부터 별도의 라이브러리를 사용하지 않고 서블릿 API 자체에서 파일 업로드를 처리해주는 API를 제공.

1) application.properties
  - MultiPart 관련 설정 정보 추가
    ++
    spring.servlet.multipart.enabled=true
    spring.servlet.multipart.location=C:\\upload
    spring.servlet.multipart.max-request-size=30MB
    spring.servlet.multipart.max-file-size=10MB

    // path 설정
    org.zerock.upload.path=C:\\upload

2) UpDownController
  - application.properties에서 path로 설정해 놓은 것을 어노테이션 @Value로 path 정보 읽어서 변수의 값으로 사용.
    ++
    @Value("${org.zerock.upload.path}")
    private String uploadPath;

3) 첨부파일 저장 (UUID)
  - 파일 저장시 동일 이름의 파일에 문제가 생길수 있으므로 UUID를 사용하여 처리

  


    ++
    if(uploadFileDTO.getFiles() !=  null) {
        uploadFileDTO.getFiles().forEach(multipartFile -> {

            String originalName = multipartFile.getOriginalFilename();
            log.info(originalName);

            String uuid = UUID.randomUUID().toString();

            // UUID사용하여 파일 이름이 겹치는걸 방지
            Path savePath = Paths.get(uploadPath, uuid + "_" + originalName);

            try {
                multipartFile.transferTo(savePath); // 실제 파일 저장
            } catch (IOException e) {
                e.printStackTrace();
            }

        });
    }


```

