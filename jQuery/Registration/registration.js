(function($) {
    $(function() {

        $('#fill_form').on('click', function (event) {
            $('#registration').slideDown(2000);
        })

    var validators = {
        login: {
            regexp: /^[A-Za-z0-9]+$/i,
            error_msg: 'Логин должен начинаться с буквы и\n' +
                ' содержать только латинские буквы и цифры!',
            isRequired: true
        },
        email: {
            regexp: /^\w+@\w+\.\w+$/i,
            error_msg: 'Эл/почта задана неверно! Проверьте ваш email!',
            isRequired: true
        },
        tel: {
            regexp: /^\+\d\(\d{3}\)\d{3}-\d{4}$/,
            error_msg: 'Номер телефона должен соответствовать формату +7(900)000-0000',
            isRequired: false
        },
        password: {
            regexp: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/,
            error_msg: 'Пароль должен содержать хотя бы 1: латинскую букву в верхнем и нижнем регистрах,\
                        спецсимвол, число и быть не менее 6 символов',
            isRequired: true
        },
        confirm_password: {
            error_msg: 'Пароли не совпадают. Подтвердите повторно!',
            isRequired: true
        }

    };

    $('#dialog').dialog({ autoOpen: false,
            show: {
                effect: 'drop',
                duration: 500
            },
            hide: {
                effect: 'scale',
                duration: 500
            },
            draggable: true,
            title: 'Обнаружены ошибки!!!',
            close: function (event, ui) {
                $(this).remove()
            }
        });
        $('#registr_button').on('click', function () {
            // $('.form_field').filter(function (index) {
            //     console.log(validators[this.id]);
            //     console.log(validators[this.id].regexp);
            //     if (!validators[this.id].regexp.test(this.value)) {
            //         $('#dialog p').text(validators[this.id].error_msg);
            //         this.addClass('invalid').effect('bounce', {times: 3}, 'slow')
            //         $('#dialog').dialog('open');
            // error_count = false;
            event.preventDefault();
            var error_count = 0;
            $('.form_field').each(function (event) {
                if (!validators[this.name].regexp.test(this.value)&& this.value !== '') {
                    // alert(validators[this.name].error_msg);
                    $('#hint_' + this.name).text(validators[this.name].error_msg);
                    $(this).addClass('invalid');
                    $(this).effect('pulsate', 'slow');
                    // $('#dialog').dialog('open');
                    error_count += 1;
                }
                else if (validators[this.name].isRequired && this.value === '') {
                    // $('#dialog').attr('title', 'Не заполнены обязательные поля!');
                    $('#text_error').text('Не заполнены обязательные поля:');
                    $('#dialog p').append(this.title + '<br>');
                    $('#dialog').dialog('open');
                    error_count += 1;
                }

                else{
                    $(this).removeClass('invalid');
                    $('#hint_' + this.name).text('');
                }

            })
            if ($('#password_confirm').val() != $('#password').val()) {
                $('#dialog p').append('Пароль и подтверждение пароля не совпадают!');
                $('#dialog').dialog('open');
                error_count += 1;
            }

            else if (!error_count) {
                alert('Вы зарегистрированы! Приятных покупок!');
                $('#registration').get(0).submit();
            }
        })




    })
})(jQuery)