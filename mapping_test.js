// 基于用户提供的索引映射表构建 dlib → clm 映射 (修正版)
const mapping68to71 = {
    // 下颌线 dlib 0-16 → clm 0-14 
    0: 0,   // dlib 0 → clm 0
    1: 1,   // dlib 1 → clm 1  
    2: 2,   // dlib 2 → clm 2
    3: 3,   // dlib 3 → clm 3
    4: 4,   // dlib 4 → clm 4
    5: 5,   // dlib 5 → clm 5
    6: 6,   // dlib 6 → clm 6
    7: 7,   // dlib 7 → clm 7
    8: 8,   // dlib 8 → clm 8
    9: 9,   // dlib 9 → clm 9
    10: 10, // dlib 10 → clm 10
    11: 11, // dlib 11 → clm 11
    12: 12, // dlib 12 → clm 12
    13: 13, // dlib 13 → clm 13
    14: 14, // dlib 14 → clm 14
    // 跳过 dlib 15,16 (dlib有17个下颌点，clm只有15个)
    
    // 左眉 dlib 17-21 → clm 19-22
    17: 19, // dlib 17 → clm 19
    18: 20, // dlib 18 → clm 20
    19: 21, // dlib 19 → clm 21 
    20: 22, // dlib 20 → clm 22
    // 跳过 dlib 21
    
    // 右眉 dlib 22-26 → clm 15-18
    22: 18, // dlib 22 → clm 18
    23: 17, // dlib 23 → clm 17
    24: 16, // dlib 24 → clm 16 
    25: 15, // dlib 25 → clm 15
    // 跳过 dlib 26
    
    // 鼻梁 dlib 27-30 → clm 33,41,62
    27: 33, // dlib 27 → clm 33 (鼻根)
    28: 41, // dlib 28 → clm 41 (鼻梁中点)
    29: 39, // dlib 29 → clm 39 (鼻梁中段)
    30: 62, // dlib 30 → clm 62 (鼻尖上方)
    
    // 鼻翼 dlib 31-35 → clm 34-38,42-43
    31: 34, // dlib 31 → clm 34
    32: 42, // dlib 32 → clm 42  
    33: 37, // dlib 33 → clm 37 (鼻柱底部)
    34: 43, // dlib 34 → clm 43
    35: 38, // dlib 35 → clm 38
    
    // 左眼 dlib 36-41 → clm 23-26,63-66
    36: 23, // dlib 36 → clm 23 (左眼外角)
    37: 63, // dlib 37 → clm 63
    38: 64, // dlib 38 → clm 64
    39: 25, // dlib 39 → clm 25 (左眼上缘内)
    40: 65, // dlib 40 → clm 65
    41: 66, // dlib 41 → clm 66
    
    // 右眼 dlib 42-47 → clm 28-31,67-70
    42: 30, // dlib 42 → clm 30 (右眼内角)
    43: 68, // dlib 43 → clm 68
    44: 67, // dlib 44 → clm 67 (右眼上缘外)
    45: 28, // dlib 45 → clm 28 (右眼外角)
    46: 70, // dlib 46 → clm 70
    47: 69, // dlib 47 → clm 69
    
    // 嘴巴外轮廓 dlib 48-59 → clm 44-55
    48: 44, // dlib 48 → clm 44 (左嘴角)
    49: 45, // dlib 49 → clm 45
    50: 46, // dlib 50 → clm 46
    51: 47, // dlib 51 → clm 47
    52: 48, // dlib 52 → clm 48
    53: 49, // dlib 53 → clm 49
    54: 50, // dlib 54 → clm 50 
    55: 51, // dlib 55 → clm 51
    56: 52, // dlib 56 → clm 52
    57: 53, // dlib 57 → clm 53
    58: 54, // dlib 58 → clm 54
    59: 55, // dlib 59 → clm 55
    
    // 嘴巴内轮廓 dlib 60-67 → clm 56-61
    60: 56, // dlib 60 → clm 56 
    61: 57, // dlib 61 → clm 57
    62: 58, // dlib 62 → clm 58
    63: 59, // dlib 63 → clm 59
    64: 60, // dlib 64 → clm 60
    65: 61, // dlib 65 → clm 61
    // 跳过 dlib 66,67 因为 clm 内轮廓只有6个点
};

// 检查重复映射
const usedClmIndices = new Set();
const duplicates = [];

Object.entries(mapping68to71).forEach(([dlibIdx, clmIdx]) => {
    if (usedClmIndices.has(clmIdx)) {
        duplicates.push({ dlibIdx: parseInt(dlibIdx), clmIdx });
    } else {
        usedClmIndices.add(clmIdx);
    }
});

console.log('=== 映射检查结果 ===');
console.log('映射总数:', Object.keys(mapping68to71).length);
console.log('唯一clm索引数:', usedClmIndices.size);

if (duplicates.length > 0) {
    console.log('\n❌ 发现重复映射到相同clm索引:');
    duplicates.forEach(dup => {
        console.log(`  dlib ${dup.dlibIdx} → clm ${dup.clmIdx}`);
    });
} else {
    console.log('\n✅ 无重复映射，检查通过!');
}

// 检查未映射的clm索引
const mappedClmIndices = Array.from(usedClmIndices);
const missingClm = [];
for (let i = 0; i < 71; i++) {
    if (!mappedClmIndices.includes(i)) {
        missingClm.push(i);
    }
}

if (missingClm.length > 0) {
    console.log('\n⚠️ 未映射的clm索引:', missingClm.join(', '));
    console.log('   (这些索引需要插值计算)');
} else {
    console.log('\n✅ 所有clm索引都有映射');
}

// 输出最终映射表 (按clm索引排序)
console.log('\n=== 最终映射表 (clm → dlib) ===');
const reverseMapping = {};
Object.entries(mapping68to71).forEach(([dlibIdx, clmIdx]) => {
    reverseMapping[clmIdx] = parseInt(dlibIdx);
});

for (let i = 0; i < 71; i++) {
    if (reverseMapping[i] !== undefined) {
        console.log(`clm ${i} ← dlib ${reverseMapping[i]}`);
    } else {
        console.log(`clm ${i} ← 需要插值计算`);
    }
} 