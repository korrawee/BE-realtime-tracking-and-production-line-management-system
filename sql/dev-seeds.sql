do $$
    declare
    index integer := 0;

    begin
    while index <10 loop
        INSERT INTO accounts VALUES (
            index,
            concat('user', cast(index AS text)),
            '1234',
            concat('full-name', cast(index AS text)),
            'worker',
            '0981',
            12.0,
            '{"data": "eiei"}', 
            NULL
        );
        INSERT INTO shifts VALUES (
            index, 
            cast(now() as date), 
            '08:00:00', 
            500, 
            100, 
            20, 
            30, 
            15
        );
        index := index+1;
    end loop;

        INSERT INTO departments VALUES (1, 'ต้มไก่', 1);
        INSERT INTO departments VALUES (2, 'ต้มไก่', 1);
        INSERT INTO _controls VALUES (1, 1);
        INSERT INTO _controls VALUES (2, 2);

        INSERT INTO work_on VALUES(2, 1, '07:00', NULL, NULL, cast(now() as date));
        INSERT INTO work_on VALUES(3, 1, '08:00', NULL, NULL, cast(now() as date));
        INSERT INTO work_on VALUES(4, 1, '08:01', NULL, NULL, cast(now() - INTERVAL '-1 days' as date));
        INSERT INTO work_on VALUES(5, 1, NULL, NULL, NULL, cast(now() - INTERVAL '-1 days' as date));

        INSERT INTO work_on VALUES(6, 2, '07:45', NULL, NULL, cast(now() as date));
        INSERT INTO work_on VALUES(7, 2, '08:00', NULL, NULL, cast(now() as date));
        INSERT INTO work_on VALUES(8, 2, '08:01', NULL, NULL, cast(now() - INTERVAL '-1 days' as date));

        INSERT INTO requests values(1, 3, cast(now() as date), 4, 'รอดำเนินการ', '1');
        INSERT INTO requests values(1, 4, cast(now() as date), 4, 'รอดำเนินการ', '1');
        INSERT INTO requests values(1, 5, cast(now() - INTERVAL '-1 days' as date), 4, 'รอดำเนินการ', '1');

        INSERT INTO requests values(2, 6, cast(now() as date), 4, 'รอดำเนินการ', '1');
        INSERT INTO requests values(2, 7, cast(now() as date), 4, 'รอดำเนินการ', '1');
        INSERT INTO requests values(2, 8, cast(now() - INTERVAL '-1 days' as date), 4, 'รอดำเนินการ', '1');
end$$;
