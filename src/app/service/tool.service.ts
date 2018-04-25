import { Component, Injectable, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class ToolService {
    constructor(private datePipe: DatePipe) {
    }
    // 验证手机
    checkPhone(phone) {
        phone = (phone + '').replace(/[\D]/g, '');
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    }
    // 身份证号合法性验证
    // 支持15位和18位身份证号
    // 支持地址编码、出生日期、校验位验证
    IdentityCodeValid(code) {
        const city = {11:'北京',12:'天津',13:'河北',14:'山西',15:'内蒙古',21:'辽宁',22:'吉林',23:'黑龙江 ',31:'上海',32:'江苏',33:'浙江',34:'安徽',35:'福建',36:'江西',37:'山东',41:'河南',42:'湖北 ',43:'湖南',44:'广东',45:'广西',46:'海南',50:'重庆',51:'四川',52:'贵州',53:'云南',54:'西藏 ',61:'陕西',62:'甘肃',63:'青海',64:'宁夏',65:'新疆',71:'台湾',81:'香港',82:'澳门',91:'国外 '};
        let tip = '';
        let pass = true;

        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            tip = '身份证号格式错误';
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            tip = '地址编码错误';
            pass = false;
        } else {
            // 18位身份证需要验证最后一位校验位
            if (code.length === 18) {
                code = code.split('');
                // ∑(ai×Wi)(mod 11)
                // 加权因子
                const factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                // 校验位
                const parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                const last = parity[sum % 11];
                if (parity[sum % 11] !== code[17]) {
                    tip = '校验位错误';
                    pass = false;
                }
            }
        }
        // if (!pass) {alert(tip); }
        // return pass;
        return {pass: pass, tip: tip};
    }
    bankCodeValid(card_number) {
        // 卡号字符串化并去除空格，仅保留数字
        const str_digits = (card_number + '').replace(/[\D]/g, '');
        // 银行卡号必须为12-19位数字
        if (!/^\d{12,19}$/.test(str_digits)) {
            return false;
        }
        // 根据luhn规则，将卡号数组化，并反转顺序，以便于操作
        const luhn_digits = str_digits.split('').reverse(),
            // 取第1位作为后续的验证号码
            luhn_checkcode = parseInt(luhn_digits.shift(), 10);
        const loop_length = luhn_digits.length;
        let loop_index = loop_length;
        let luhn_sum = 0;
        for (; loop_index > 0; loop_index--) {
            const _i = loop_length - loop_index,
                _k = parseInt(luhn_digits[_i], 10);
            let _add_val = _k;
            // 偶数字段 需要*2，并且大于10的数字要相加2个位数的值
            if ((_i % 2) === 0) {
                const _k2 = _k * 2;
                switch (_k2) {
                    case 10: _add_val = 1; break;
                    case 12: _add_val = 3; break;
                    case 14: _add_val = 5; break;
                    case 16: _add_val = 7; break;
                    case 18: _add_val = 9; break;
                    default: _add_val = _k2;
                }
            }
            luhn_sum += _add_val;
        }
        /* 方法1
           1. 从校验位开始，从右往左，偶数位乘2，然后将两位数字的个位与十位相加；
           2. 计算所有数字的和（67）；
           3. 乘以9（603）；
           4. 取其个位数字（3），得到校验位。
         */
        const luhn_sum9 = luhn_sum * 9,
            luhn_sum9_last_code = parseInt((luhn_sum9 + '').replace(/\d+(\d$)/, '$1'), 10);
        return (luhn_sum9_last_code === luhn_checkcode);
        /* 方法2
           1. 从校验位(即不包括该位数)开始，从右往左，偶数位乘2（例如，7*2=14），然后将两位数字的个位与十位相加（例如，10：1+0=1）；
           2. 把得到的数字加在一起；
           3. 将数字的和取模10（本例中得到7），再用10去减（本例中得到3），得到校验位。
         */
        // var luhn_sum_mod10 = luhn_sum%10,
        //     luhn_sum_checkcode = 10 - luhn_sum_mod10;
        // return (luhn_sum_checkcode===luhn_checkcode);
        /* 方法3
           1. 从校验位(即不包括该位数)开始，从右往左，偶数位乘2（例如，7*2=14），然后将两位数字的个位与十位相加（例如，10：1+0=1）；
           2. 把得到的数字加在一起；
           3. 再加上检验位的数值，将结果取模10，如果余数为0，则符合规则。
         */
        // return (((luhn_sum+luhn_checkcode)%10) === 0);
    }

    // date转标准日期格式
    dateFormatter(date) {
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-'
            + (d < 10 ? ('0' + d) : d);
    }
    // 字符转date y-MM-dd
    dateParser(s) {
        if (!s) {
            return new Date();
        }
        const ss = (s.split('-'));
        const y = parseInt(ss[0], 10);
        const m = parseInt(ss[1], 10);
        const d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return new Date();
        }
    }
    // 格式化时间
  formatDate(date, flag?: Number) {
    if (date) {
      switch (flag) {
        case 0:
          return this.datePipe.transform(date, 'yyyy');
        case 1:
          return this.datePipe.transform(date, 'yyyy-MM');
        case 3:
          return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
        default:
          return this.datePipe.transform(date, 'yyyy-MM-dd');
      }
    } else {
      return null;
    }
  }
}
